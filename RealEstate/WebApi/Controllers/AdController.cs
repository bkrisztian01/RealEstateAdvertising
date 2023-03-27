using Domain.DTOs;
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
        private readonly AuthorizationService _authorizationService;

        public AdController(AdService adService, AuthorizationService authorizationService)
        {
            _adService = adService;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public IEnumerable<AdListingDTO> GetAds([FromQuery] string userName = "", [FromQuery] int pageIndex = 0, [FromQuery] int pageSize = 12)
        {
            return _adService.GetAds(userName, pageIndex, pageSize);
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
            var userName = User.Identity!.Name;
            if (userName == null)
            {
                return Unauthorized();
            }
            else if (!_authorizationService.IsOwnerOfAd(id, userName!))
            {
                return Forbid();
            }

            _adService.DeleteAdById(id);
            return NoContent();
        }

        [HttpPost]
        [Route("create")]
        [Authorize]
        public IActionResult CreateAd([FromBody] AdListingDTO ad)
        {
            var userName = User.Identity!.Name;
            return Ok(_adService.CreateAd(ad, userName!));
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public IActionResult EditAd([FromBody] AdListingDTO ad, int id)
        {
            ad.Id = id;
            var userName = User.Identity!.Name;
            if (userName == null)
            {
                return Unauthorized();
            }
            else if (!_authorizationService.IsOwnerOfAd(ad.Id, userName!))
            {
                return Forbid();
            }

            return Ok(_adService.EditAd(ad));
        }
    }
}
