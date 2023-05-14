import { Center, Heading, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { getMessageContactList } from 'api/messageApi';
import { AxiosError } from 'axios';
import { Loading } from 'components/Loading';
import { PageButtons } from 'components/PageButtons';
import { MessageContactList } from 'model/MessageContactList';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { MessageListRow } from '../../Message/MessageListRow.tsx';

export const MessageList = () => {
  const authHeader = useAuthHeader();

  const [pageIndex, setPageIndex] = useState(1);

  const { isLoading, isError, error, data, isPreviousData } = useQuery<
    MessageContactList,
    AxiosError
  >({
    queryKey: ['messages', pageIndex],
    queryFn: () => getMessageContactList(authHeader(), pageIndex),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return (
      <Heading size="md">{error instanceof Error ? error.message : ''}</Heading>
    );
  }

  return (
    <>
      <Table>
        <col span={1} width="60%" />
        <col span={1} width="20%" />
        <col span={1} width="20%" />

        <Thead>
          <Tr>
            <Th>Contact</Th>
            <Th>
              <Center>New</Center>
            </Th>
            <Th>
              <Center>Last message</Center>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {data?.messageContacts.map((messageContact, i) => (
            <MessageListRow messageContact={messageContact} key={i} />
          ))}
        </Tbody>
      </Table>
      <Center>
        <PageButtons
          onPreviousClick={() => {
            setPageIndex((prev) => Math.max(1, prev - 1));
            window.scrollTo(0, 0);
          }}
          onNextClick={() => {
            setPageIndex((prev) => prev + 1);
            window.scrollTo(0, 0);
          }}
          prevDisabled={pageIndex === 1}
          nextDisabled={isPreviousData || !data?.hasMore}
        >
          {pageIndex}
        </PageButtons>
      </Center>
    </>
  );
};
