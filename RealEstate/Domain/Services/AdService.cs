using Domain.Models;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class AdService
    {
        private readonly IAdRepository  _adRepository;

        public AdService(IAdRepository repository)
        {
            _adRepository = repository;
        }

        public IEnumerable<Ad> GetAds(int pageIndex = 0, int pageSize = 12)
        { 
            return _adRepository.GetAds(pageIndex, pageSize);
        }

        public Ad GetAdById(int adId)
        {
            return _adRepository.GetAdById(adId);
        }

        public void DeleteAdById(int adId) 
        {
            _adRepository.DeleteAdById(adId);
        }
    }
}
