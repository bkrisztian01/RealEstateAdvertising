import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  Icon,
  IconButton,
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { getMessagesWith } from 'api/messageApi';
import { Loading } from 'components/Loading';
import useMessageHub from 'hooks/useMessageHub';
import { Message } from 'model/Message';
import { User } from 'model/User';
import { useEffect, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsFillSendFill } from 'react-icons/bs';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { MessageLine } from './MessageLine';
import './style.css';

const messageSchema = yup.object<MessageFormInput>({
  content: yup.string().label('Message').required(),
});

export type MessageFormInput = {
  content: string;
};

export const MessagePage = () => {
  const {
    sendMessage,
    addOnNewMessageHandler,
    removeOnNewMessageHandler,
    markMessagesAsRead,
  } = useMessageHub();
  const { userName } = useParams();
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const onNewMessage = (message: Message) => {
    if (message.fromUser.userName === userName) {
      setMessages((prev) => [...prev, message]);
    }
  };

  const {
    mutate: getMessages,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: () => getMessagesWith(authHeader(), userName!),
    onSuccess: (data) => {
      setMessages(data.messages);
      setUser(data.user);
    },
  });

  const onFocus = () => {
    if (document.hasFocus()) {
      console.log('MessagePage is visible.');

      const user = auth();
      if (!user) return;

      markMessagesAsRead(userName!);
    } else {
      console.log('MessagePage is hidden.');
    }
  };

  useEffect(() => {
    if (auth()?.userName === userName) {
      navigate('/home');
    }

    addOnNewMessageHandler(onNewMessage);
    getMessages();

    window.addEventListener('focus', onFocus);

    return () => {
      console.log('MessagePage dismounted?');
      removeOnNewMessageHandler(onNewMessage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth()?.userName === userName) {
      navigate('/home');
    }
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
    setIsSubmitLoading(true);
    sendMessage(data.content, userName!)
      .then((message) => {
        setMessages((prev) => [...prev, message]);
      })
      .finally(() => setIsSubmitLoading(false));
    reset();
  };

  if (isLoading) {
    return <Loading />;
  }

  let content;

  if (isError) {
    content = (
      <Heading size="md">{error instanceof Error ? error.message : ''}</Heading>
    );
  } else {
    content = (
      <>
        <Box className="messages-header">
          <Heading as="h3" size="md">
            {user?.fullName}
          </Heading>
        </Box>
        <Box className="messages">
          {messages.map((msg, i) => {
            return <MessageLine message={msg} key={i} />;
          })}
        </Box>

        <Box className="message-area">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.content}>
              <HStack spacing="5px" alignItems="normal">
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
      </>
    );
  }

  return (
    <Container className="page-content" p="30" maxW="container.md">
      <Box className="message-page">{content}</Box>
    </Container>
  );
};
