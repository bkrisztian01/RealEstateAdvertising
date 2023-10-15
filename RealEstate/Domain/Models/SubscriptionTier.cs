using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace Domain.Models
{
    public class SubscriptionTier
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int MaxHighlightedAds { get; set; }
    }
}