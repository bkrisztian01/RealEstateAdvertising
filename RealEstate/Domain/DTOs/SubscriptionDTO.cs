namespace Domain.DTOs
{
    public class SubscriptionDTO
    {
        public UserDTO User { get; set; }
        public SubscriptionTierDTO Tier { get; set; }
        public DateTime ValidUntil { get; set; }
    }
}