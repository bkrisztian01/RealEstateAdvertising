import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  Icon,
  IconButton,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { getMessagesWith, sendMessage } from 'api/messageApi';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';
import { Message } from 'model/Message';
import { useEffect } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsSend } from 'react-icons/bs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import './style.css';

const messageSchema = yup.object<MessageFormInput>({
  content: yup.string().label('Message').required(),
});

export type MessageFormInput = {
  content: string;
};

export const MessagePage = () => {
  const { userName } = useParams();
  const authHeader = useAuthHeader();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, isError, error, data, isPreviousData } = useQuery<
    Message[],
    AxiosError
  >({
    queryKey: [userName, 'messages'],
    queryFn: () => {
      return getMessagesWith(authHeader(), userName!);
    },
    onError: (err) => {
      if (err.response?.status === 404) {
        console.log('404');
        navigate('/404');
      }
    },
  });

  const { mutate, isLoading: isSubmitLoading } = useMutation<
    unknown,
    AxiosError,
    MessageFormInput
  >({
    mutationFn: (data) => sendMessage(authHeader(), userName!, data.content),
    onSuccess: (_) => {
      queryClient.invalidateQueries([userName, 'messages']);
    },
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries('newMessageCount');
    };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormInput>({
    resolver: yupResolver(messageSchema),
  });

  const onSubmit: SubmitHandler<MessageFormInput> = (
    data: MessageFormInput,
  ) => {
    mutate(data);
    reset();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxW="container.md" py="10px">
      <Box id="messages">
        {data?.map((msg, i) => {
          return (
            <Box className="message" key={i}>
              <Tooltip
                placement="bottom-start"
                openDelay={500}
                hasArrow
                label={msg.date.toLocaleDateString()}
              >
                <Text>
                  <b
                    style={{
                      color:
                        msg.fromUser.userName === userName ? 'black' : 'green',
                    }}
                  >
                    {msg.fromUser.fullName}
                  </b>{' '}
                  {msg.content}
                </Text>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
      <Box position="relative">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            position="absolute"
            zIndex="100"
            w="fit-content"
            right="2px"
            top="2px"
          >
            <IconButton
              type="submit"
              background="none"
              isLoading={isSubmitLoading}
              aria-label={'Send'}
              icon={<Icon as={BsSend} />}
            >
              Send
            </IconButton>
          </FormControl>
          <FormControl
            className="text-field-form-control"
            isInvalid={!!errors.content}
          >
            <Textarea
              id="text-field"
              isInvalid={!!errors.content}
              placeholder={`Message to ${userName}...`}
              {...register('content')}
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};
