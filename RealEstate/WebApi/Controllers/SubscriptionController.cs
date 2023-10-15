using DAL.Repositories;
using Domain.DTOs;
using Domain.Services;
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
    }
}