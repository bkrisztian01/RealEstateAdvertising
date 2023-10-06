using AutoMapper;
using Domain.DTOs;
using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    [Authorize]
    public class MessageHub : Hub
    {
        public static Dictionary<string, List<string>> ConnectedUsers = new Dictionary<string, List<string>>();

        private readonly MessageService _messageService;
        private readonly IMapper _mapper;

        private const string NEW_MESSAGE = "NewMessage";
        private const string NEW_MESSAGE_COUNT_CHANGED = "NewMessageCountChanged";

        public MessageHub(MessageService messageService, IMapper mapper)
        {
            _messageService = messageService;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();

            string connectionId = Context.ConnectionId;
            string userName = GetUserName();

            if (userName == null)
            {
                throw new ArgumentNullException(nameof(userName));
            }

            lock (ConnectedUsers)
            {
                if (!ConnectedUsers.ContainsKey(userName))
                {
                    ConnectedUsers.Add(userName, new List<string>());
                }
                ConnectedUsers[userName].Add(connectionId);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            string userName = GetUserName();
            string connectionId = Context.ConnectionId;

            lock (ConnectedUsers)
            {
                if (ConnectedUsers.ContainsKey(userName))
                {
                    ConnectedUsers[userName].Remove(connectionId);
                    if (ConnectedUsers[userName].Count == 0)
                        ConnectedUsers.Remove(userName);
                }
            }

            await base.OnDisconnectedAsync(exception);
        }

        public MessageDTO Send(string recipient, string message)
        {
            string userName = GetUserName();

            MessageDTO messageDto = _mapper.Map<MessageDTO>(_messageService.CreateMessage(recipient, userName, message));

            if (ConnectedUsers.ContainsKey(recipient))
            {
                Clients.Clients(ConnectedUsers[recipient]).SendAsync(
                    NEW_MESSAGE,
                    messageDto
                );

                int numberOfNewMessages = _messageService.GetNewMessageCount(recipient);
                Clients.Clients(ConnectedUsers[recipient]).SendAsync(
                    NEW_MESSAGE_COUNT_CHANGED,
                    numberOfNewMessages
                );
            }

            return messageDto;
        }

        public void MarkMessagesWithUserAsRead(string withUser)
        {
            string userName = GetUserName();

            int messagesAffected = _messageService.MarkMessagesAsRead(userName, withUser);

            if (messagesAffected > 0)
            {
                int numberOfNewMessages = _messageService.GetNewMessageCount(userName);
                Clients.Clients(ConnectedUsers[userName]).SendAsync(
                    "NewMessageCountChanged",
                    numberOfNewMessages
                );
            }
        }

        public int GetNewMessageCount()
        {
            return _messageService.GetNewMessageCount(GetUserName());
        }

        private string GetUserName()
        {
            string? userName = Context.User?.Identity?.Name;

            if (userName == null)
            {
                throw new ArgumentNullException(nameof(userName));
            }

            return userName;
        }
    }
}
