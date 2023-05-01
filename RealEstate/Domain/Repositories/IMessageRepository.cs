using Domain.DTOs;
using Domain.Models;

namespace Domain.Repositories
{
    public interface IMessageRepository
    {
        public MessagesDTO GetMessagesWith(string withUserName, string loggedInUserName);
        public Message CreateMessage(string withUserName, string loggedInUserName, string content);
        public int GetNewMessageCount(string loggedInUserName);
        public IEnumerable<MessageContactDTO> GetMessageContactList(string loggedInUserName);
    }
}