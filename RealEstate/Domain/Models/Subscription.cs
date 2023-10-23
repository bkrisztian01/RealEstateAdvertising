using Microsoft.EntityFrameworkCore;

namespace Domain.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public User User { get; set; }
        public SubscriptionTier Tier { get; set; }
        public DateTime ValidUntil { get; set; }
    }
}