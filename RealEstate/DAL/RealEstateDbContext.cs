using Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class RealEstateDbContext : IdentityDbContext<User>
    {
        private readonly IWebHostEnvironment environment;

        public RealEstateDbContext(IWebHostEnvironment environment)
        {
            this.environment = environment;
        }
        public RealEstateDbContext(DbContextOptions options, IWebHostEnvironment environment) : base(options)
        {
            this.environment = environment;
        }

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