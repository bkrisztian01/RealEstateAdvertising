using Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class RealEstateDbContext: IdentityDbContext<User>
    {
        public RealEstateDbContext() { }
        public RealEstateDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Ad> Ads { get; set; } = null!;
    }
}