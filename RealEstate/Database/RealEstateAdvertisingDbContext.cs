using Domain;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Database
{
    public class RealEstateAdvertisingDbContext: DbContext
    {
        public RealEstateAdvertisingDbContext() { }
        public RealEstateAdvertisingDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Ad> Ads { get; set; } = null!;
    }
}