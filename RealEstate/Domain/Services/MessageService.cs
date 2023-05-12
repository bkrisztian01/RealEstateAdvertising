using AutoMapper;
using Domain.DTOs;
using Domain.Repositories;

namespace Domain.Services
{
    public class MessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;

        public MessageService(IMessageRepository messageRepository, IMapper mapper)
        {
            _messageRepository = messageRepository;
            _mapper = mapper;
        }

        public MessagesDTO GetMessagesWith(string withUserName, string loggedInUserName)
        {
            return _messageRepository.GetMessagesWith(withUserName, loggedInUserName);
        }

        public MessageDTO CreateMessage(string withUserName, string loggedInUserName, string content)
        {
            return _mapper.Map<MessageDTO>(_messageRepository.CreateMessage(withUserName, loggedInUserName, content));
        }

        public int GetNewMessageCount(string loggedInUserName)
        {
            return _messageRepository.GetNewMessageCount(loggedInUserName);
        }

        public MessageContactListDTO GetMessageContactList(string loggedInUserName, int pageIndex, int pageSize)
        {
            return new MessageContactListDTO
            {
                MessageContacts = _messageRepository.GetMessageContactList(loggedInUserName, pageIndex, pageSize),
                HasMore = _messageRepository.HasMoreEntries(loggedInUserName, pageIndex, pageSize),
            };
        }
    }
}