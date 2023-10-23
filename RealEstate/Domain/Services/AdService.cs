using AutoMapper;
using Domain.DTOs;
using Domain.Repositories;
using Domain.Services.Parameters;

namespace Domain.Services
{
    public class AdService
    {
        private readonly IAdRepository _adRepository;
        private readonly IMapper _mapper;

        public AdService(IAdRepository repository, IMapper mapper)
        {
            _adRepository = repository;
            _mapper = mapper;
        }

        public AdListDTO GetAds(GetAdsParameters parameters)
        {
            return new AdListDTO()
            {
                Ads = _adRepository.GetAds(parameters),
                HasMore = _adRepository.HasMoreEntries(parameters)
            };
        }

        public AdWithOwnerDTO? GetAdById(int adId)
        {
            var dbAd = _adRepository.GetAdById(adId);
            if (dbAd == null)
            {
                return null;
            }
            return _mapper.Map<AdWithOwnerDTO>(dbAd);
        }

        public void DeleteAdById(int adId)
        {
            _adRepository.DeleteAdById(adId);
        }

        public AdDTO CreateAd(CreateAdDTO ad, string userName)
        {
            var dbAd = _adRepository.CreateAd(ad, userName);

            return _mapper.Map<AdDTO>(dbAd);
        }

        public AdDTO EditAd(EditAdDTO ad)
        {
            var dbAd = _adRepository.EditAd(ad);

            return _mapper.Map<AdDTO>(dbAd);
        }

        public bool CanHighlightAd(string userName)
        {
            return _adRepository.CanHighlightAd(userName);
        }
    }
}
