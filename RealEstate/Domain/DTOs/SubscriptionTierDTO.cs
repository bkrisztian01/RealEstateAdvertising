namespace Domain.DTOs
{
    public class SubscriptionTierDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int MaxHighlightedAds { get; set; }
    }
}