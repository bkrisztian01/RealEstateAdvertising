using Domain;
using Domain.DTOs;
using Domain.Models;
using Domain.Repositories;
using Domain.Services;
using Domain.Services.Parameters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Domain.Services.Parameters.GetAdsParameters;

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
        [ProducesResponseType(StatusCodes.Status200OK)]
        public AdListDTO GetAds([FromQuery] GetAdsParameters parameters)
        {
            return _adService.GetAds(parameters);
        }

        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetById(int id)
        {
            var ad = _adService.GetAdById(id);
            if (ad == null)
            {
                return NotFound();
            }
            return Ok(ad);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
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
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult CreateAd([FromBody] CreateAdDTO ad)
        {
            var userName = User.Identity!.Name;
            var newAd = _adService.CreateAd(ad, userName!);
            try
            {
                return CreatedAtAction(nameof(GetById), new { id = newAd.Id }, newAd);
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult EditAd([FromBody] EditAdDTO ad, int id)
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

            try
            {
                return Ok(_adService.EditAd(ad));
            }
            catch (NotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
