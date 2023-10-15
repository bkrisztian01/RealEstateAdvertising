using Domain.DTOs;
using Domain.Models;

namespace Domain.Repositories
{
    public interface ISubscriptionRepository
    {
        public IEnumerable<SubscriptionTierDTO> GetAllTiers();
    }
}