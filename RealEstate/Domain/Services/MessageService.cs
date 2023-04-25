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

        public IEnumerable<MessageDTO> GetMessagesWith(string withUserName, string loggedInUserName)
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

        public IEnumerable<MessageContactDTO> GetMessageContactList(string loggedInUserName)
        {
            return _messageRepository.GetMessageContactList(loggedInUserName);
        }
    }
}