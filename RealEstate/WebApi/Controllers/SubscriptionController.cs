using DAL.Repositories;
using Domain.DTOs;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly SubscriptionService _subscriptionService;

        public SubscriptionController(SubscriptionService subscriptionService)
        {
            this._subscriptionService = subscriptionService;
        }

        [Route("tiers")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IEnumerable<SubscriptionTierDTO> GetAllTiers()
        {
            return _subscriptionService.GetAllTiers();
        }

        [Authorize]
        [Route("subscribe")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult SubscribeToTier([FromBody] SubscribeToTierDTO sub)
        {
            var userName = User.Identity!.Name;
            if (userName == null)
            {
                return Unauthorized();
            }

            _subscriptionService.SubscribeToTier(sub.TierId, userName);

            return Ok();
        }
    }
}