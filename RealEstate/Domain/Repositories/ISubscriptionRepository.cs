using Domain.DTOs;
using Domain.Models;

namespace Domain.Repositories
{
    public interface ISubscriptionRepository
    {
        public IEnumerable<SubscriptionTierDTO> GetAllTiers();
        public void SubscribeToTier(int tierId, string userName);
        public SubscriptionDTO? GetUsersSubscription(string userName);
    }
}