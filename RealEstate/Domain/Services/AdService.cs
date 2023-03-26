using Domain.DTOs;
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

        public IEnumerable<AdListingDTO> GetAds(string userName = null, int pageIndex = 0, int pageSize = 12)
        { 
            return _adRepository.GetAds(userName, pageIndex, pageSize);
        }

        public Ad GetAdById(int adId)
        {
            return _adRepository.GetAdById(adId);
        }

        public void DeleteAdById(int adId)
        {
            _adRepository.DeleteAdById(adId);
        }

        public AdListingDTO CreateAd(AdListingDTO ad, string userName)
        {
            var dbAd = _adRepository.CreateAd(ad, userName);

            return new AdListingDTO
            {
                Id = dbAd.Id,
                Title = dbAd.Title,
                Address = dbAd.Address,
                Description = dbAd.Description,
                Area = dbAd.Area,
                CreatedAt = dbAd.CreatedAt,
                Image = dbAd.Image,
                Price = dbAd.Price,
                RoomCount = dbAd.RoomCount,
            };
        }
    }
}
