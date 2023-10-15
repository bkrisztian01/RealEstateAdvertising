using Domain.DTOs;
using Domain.Repositories;

namespace Domain.Services
{
    public class SubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepository;

        public SubscriptionService(ISubscriptionRepository subscriptionRepository)
        {
            _subscriptionRepository = subscriptionRepository;
        }

        public IEnumerable<SubscriptionTierDTO> GetAllTiers()
        {
            return _subscriptionRepository.GetAllTiers();
        }
    }
}