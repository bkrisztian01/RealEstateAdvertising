import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  IconButton,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { getMessagesWith, sendMessage } from 'api/messageApi';
import { AxiosError } from 'axios';
import { Loading } from 'components/Loading';
import { Message } from 'model/Message';
import { useEffect } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsFillSendFill } from 'react-icons/bs';
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
  const auth = useAuthUser();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useQuery<Message[], AxiosError>({
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
    if (auth()?.userName === userName) {
      navigate('/home');
    }

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
    <Container
      className="message-page"
      py="20px"
      maxW="container.md"
      height="100%"
    >
      <Box className="messages">
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
                        msg.fromUser.userName === userName
                          ? 'black'
                          : 'var(--chakra-colors-green-400)',
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
      <Box className="message-area">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.content}>
            <HStack spacing="5px">
              <Textarea
                id="text-field"
                isInvalid={!!errors.content}
                placeholder={`Message to ${userName}...`}
                {...register('content')}
              />
              <IconButton
                id="message-submit-button"
                type="submit"
                background="none"
                isLoading={isSubmitLoading}
                aria-label={'Send'}
                icon={<Icon as={BsFillSendFill} />}
              >
                Send
              </IconButton>
            </HStack>
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};
