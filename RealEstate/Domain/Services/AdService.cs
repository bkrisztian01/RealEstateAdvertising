using Domain.DTOs;
using Domain.Repositories;

namespace Domain.Services
{
    public class AdService
    {
        private readonly IAdRepository _adRepository;

        public AdService(IAdRepository repository)
        {
            _adRepository = repository;
        }

        public IEnumerable<AdDTO> GetAds(string userName = null, int pageIndex = 0, int pageSize = 12)
        {
            return _adRepository.GetAds(userName, pageIndex, pageSize);
        }

        public AdWithOwnerDTO GetAdById(int adId)
        {
            var dbAd = _adRepository.GetAdById(adId);
            return new AdWithOwnerDTO
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
                Owner = new OwnerDTO
                {
                    FullName = dbAd.Owner.FullName,
                    UserName = dbAd.Owner.UserName,
                    Email = dbAd.Owner.Email,
                }
            };
        }

        public void DeleteAdById(int adId)
        {
            _adRepository.DeleteAdById(adId);
        }

        public AdDTO CreateAd(CreateAdDTO ad, string userName)
        {
            var dbAd = _adRepository.CreateAd(ad, userName);

            return new AdDTO
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

        public AdDTO EditAd(EditAdDTO ad)
        {
            var dbAd = _adRepository.EditAd(ad);

            return new AdDTO
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
