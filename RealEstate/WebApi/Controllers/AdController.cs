using Domain.Models;
using Domain.Repositories;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [EnableCors("frontend")]
    [Route("api/[controller]")]
    public class AdController : ControllerBase
    {
        private readonly AdService _adService;

        public AdController(AdService adService)
        {
            _adService = adService;
        }

        [HttpGet]
        public IEnumerable<Ad> GetAds()
        {
            return _adService.GetAds();
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id)
        {
            Ad ad = _adService.GetAdById(id);
            if (ad == null)
            {
                return NotFound();
            }
            return Ok(ad);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public IActionResult DeleteById(int id)
        {
            _adService.DeleteAdById(id);
            return NoContent();
        }
    }
}
