
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Domain.DTOs;
using Domain;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly MessageService _messageService;

        public MessageController(MessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet]
        [Authorize]
        [Route("{withUserName}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<MessageDTO>> GetMessagesWith(string withUserName)
        {
            var loggedInUserName = User.Identity!.Name!;
            try
            {
                return Ok(_messageService.GetMessagesWith(withUserName, loggedInUserName));
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("{withUserName}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<MessageDTO> CreateMessage(string withUserName, [FromBody] MessageContentDTO messageContent)
        {
            try
            {
                var loggedInUserName = User.Identity!.Name!;
                var newMessage = _messageService.CreateMessage(withUserName, loggedInUserName, messageContent.Content);
                return Created("", newMessage);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpGet]
        [Authorize]
        [Route("newCount")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<int> GetNewMessageCount()
        {
            var loggedInUserName = User.Identity!.Name!;
            return _messageService.GetNewMessageCount(loggedInUserName);
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IEnumerable<MessageContactDTO> GetMessageContactList()
        {
            var loggedInUserName = User.Identity!.Name!;
            return _messageService.GetMessageContactList(loggedInUserName);
        }
    }
}