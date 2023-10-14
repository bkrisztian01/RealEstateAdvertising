using System.Linq;
using AutoMapper;
using Domain;
using Domain.DTOs;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly RealEstateDbContext _context;
        private readonly IMapper _mapper;

        public MessageRepository(RealEstateDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Message CreateMessage(string withUserName, string loggedInUserName, string content)
        {
            var toUser = _context.Users.Where(user => user.UserName == withUserName).SingleOrDefault()
                ?? throw new NotFoundException("Recipient was not found");
            var fromUser = _context.Users.Where(user => user.UserName == loggedInUserName).Single();

            var dbMessage = new Message
            {
                FromUser = fromUser,
                ToUser = toUser,
                Content = content,
                IsUnread = true,
                Date = DateTime.Now,
            };

            _context.Messages.Add(dbMessage);
            _context.SaveChanges();
            return dbMessage;
        }

        public MessagesDTO GetMessagesWith(string withUserName, string loggedInUserName)
        {
            var withUser = _context.Users.Where(user => user.UserName == withUserName).SingleOrDefault()
                ?? throw new NotFoundException("Recipient was not found");

            var messages = _context.Messages
                .Include(msg => msg.FromUser)
                .Include(msg => msg.ToUser)
                .Where(msg => msg.FromUser.UserName == withUserName || msg.ToUser.UserName == withUserName)
                .Where(msg => msg.FromUser.UserName == loggedInUserName || msg.ToUser.UserName == loggedInUserName)
                .OrderBy(msg => msg.Date)
                .ToArray();

            return new MessagesDTO
            {
                Messages = messages.Select(msg => _mapper.Map<MessageDTO>(msg)),
                User = _mapper.Map<UserDTO>(withUser),
            };
        }

        public int GetNewMessageCount(string loggedInUserName)
        {
            return _context.Messages
                .Include(msg => msg.ToUser)
                .Where(msg => msg.ToUser.UserName == loggedInUserName && msg.IsUnread)
                .Count();
        }

        public IEnumerable<MessageContactDTO> GetMessageContactList(string loggedInUserName, int pageIndex = 1, int pageSize = 12)
        {
            var querySentMessages = _context.Messages
                .Include(msg => msg.FromUser)
                .Include(msg => msg.ToUser)
                .Where(msg => msg.FromUser.UserName == loggedInUserName)
                .Select(msg => new
                {
                    msg.Id,
                    User = msg.ToUser,
                    IsUnread = false,
                    msg.Date,
                });

            var queryReceivedMessages = _context.Messages
                .Include(msg => msg.FromUser)
                .Include(msg => msg.ToUser)
                .Where(msg => msg.ToUser.UserName == loggedInUserName)
                .Select(msg => new
                {
                    msg.Id,
                    User = msg.FromUser,
                    msg.IsUnread,
                    msg.Date,
                });

            return querySentMessages.Union(queryReceivedMessages)
                .GroupBy(msg => msg.User)
                .Select(contact => new MessageContactDTO
                {
                    User = _mapper.Map<UserDTO>(contact.Key),
                    LastMessageDate = contact.Max(msg => msg.Date),
                    UnreadCount = contact.Count(msg => msg.IsUnread),
                })
                .OrderByDescending(contact => contact.LastMessageDate)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToArray();
        }

        public bool HasMoreEntries(string loggedInUserName, int pageIndex = 1, int pageSize = 12)
        {
            var querySentMessages = _context.Messages
                .Include(msg => msg.FromUser)
                .Include(msg => msg.ToUser)
                .Where(msg => msg.FromUser.UserName == loggedInUserName)
                .Select(msg => new
                {
                    msg.Id,
                    User = msg.ToUser,
                    IsUnread = false,
                    msg.Date,
                });

            var queryReceivedMessages = _context.Messages
                .Include(msg => msg.FromUser)
                .Include(msg => msg.ToUser)
                .Where(msg => msg.ToUser.UserName == loggedInUserName)
                .Select(msg => new
                {
                    msg.Id,
                    User = msg.FromUser,
                    msg.IsUnread,
                    msg.Date,
                });

            return querySentMessages.Union(queryReceivedMessages)
                .GroupBy(msg => msg.User)
                .Select(contact => new MessageContactDTO
                {
                    User = _mapper.Map<UserDTO>(contact.Key),
                    LastMessageDate = contact.Max(msg => msg.Date),
                    UnreadCount = contact.Count(msg => msg.IsUnread),
                })
                .OrderByDescending(contact => contact.LastMessageDate)
                .Skip(pageIndex * pageSize)
                .Take(pageSize)
                .Any();
        }

        public int MarkMessagesAsRead(string loggedInUserName, string withUser)
        {
            var queryMessages = _context.Messages
                .Include(msg => msg.ToUser)
                .Include(msg => msg.FromUser)
                .Where(msg => msg.FromUser.UserName == withUser &&
                       msg.ToUser.UserName == loggedInUserName &&
                       msg.IsUnread)
                .ToArray();


            foreach (var msg in queryMessages)
            {
                msg.IsUnread = false;
            }

            _context.SaveChanges();

            return queryMessages.Length;
        }
    }
}