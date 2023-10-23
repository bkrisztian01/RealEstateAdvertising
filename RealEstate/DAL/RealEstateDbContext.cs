using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class RealEstateDbContext : IdentityDbContext<User>
    {
        public RealEstateDbContext() { }
        public RealEstateDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Ad> Ads { get; set; } = null!;
        public DbSet<Message> Messages { get; set; } = null!;
        public DbSet<Subscription> Subscriptions { get; set; } = null!;
        public DbSet<SubscriptionTier> SubscriptionTiers { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Subscription>(sub =>
            {
                sub.HasOne(s => s.User)
                .WithOne()
                .HasForeignKey<Subscription>();
            });
        }
    }
}