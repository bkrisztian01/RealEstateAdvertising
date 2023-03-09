using Domain;
using Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdController : ControllerBase
    {
        private readonly IAdRepository adRepository;

        public AdController(IAdRepository adRepository)
        {
            this.adRepository = adRepository;
        }

        [HttpGet(Name = "GetAds")]
        public IEnumerable<Ad> Get()
        {
            return adRepository.GetAll();
        }
    }
}
