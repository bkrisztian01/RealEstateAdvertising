using Domain.Repositories;

public class AuthorizationService
{
    private readonly IAdRepository _adRepository;

    public AuthorizationService(IAdRepository adRepository) {
        _adRepository = adRepository;
    }

    public bool IsOwnerOfAd(int adId, string userName) {
        var ad = _adRepository.GetAdById(adId);
        return ad != null && ad.Owner.UserName == userName;
    }
}