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
            var fromUser = _context.Users.Where(user => user.UserName == loggedInUserName).Single();
            var toUser = _context.Users.Where(user => user.UserName == withUserName).SingleOrDefault();

            if (toUser == null)
            {
                throw new NotFoundException("Recipient was not found");
            }

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

        public IEnumerable<MessageDTO> GetMessagesWith(string withUserName, string loggedInUserName)
        {
            var toUser = _context.Users.Where(user => user.UserName == withUserName).SingleOrDefault();

            if (toUser == null)
            {
                throw new NotFoundException("Recipient was not found");
            }

            var messages = _context.Messages
                .Include(msg => msg.FromUser)
                .Include(msg => msg.ToUser)
                .Where(msg => msg.FromUser.UserName == withUserName || msg.ToUser.UserName == withUserName)
                .Where(msg => msg.FromUser.UserName == loggedInUserName || msg.ToUser.UserName == loggedInUserName)
                .Select(msg => _mapper.Map<MessageDTO>(msg))
                .OrderBy(msg => msg.Date)
                .ToArray();

            foreach (var msg in messages)
                msg.IsUnread = false;

            _context.SaveChanges();
            return messages;
        }

        public int GetNewMessageCount(string loggedInUserName)
        {
            return _context.Messages
                .Include(msg => msg.ToUser)
                .Where(msg => msg.ToUser.UserName == loggedInUserName && msg.IsUnread)
                .Count();
        }

        public IEnumerable<MessageContactDTO> GetMessageContactList(string loggedInUserName)
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
                .ToArray();
        }
    }
}