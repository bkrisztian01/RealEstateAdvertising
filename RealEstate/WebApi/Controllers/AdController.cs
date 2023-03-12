using Domain.Models;
using Domain.Repositories;
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
        private readonly IAdRepository adRepository;

        public AdController(IAdRepository adRepository)
        {
            this.adRepository = adRepository;
        }

        [HttpGet]
        public IEnumerable<Ad> Get()
        {
            return adRepository.GetAll();
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(int id)
        {
            Ad ad = adRepository.GetById(id);
            if (ad == null)
            {
                return NotFound();
            }
            return Ok(ad);
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult DeleteById(int id)
        {
            adRepository.DeleteById(id);
            return NoContent();
        }
    }
}
