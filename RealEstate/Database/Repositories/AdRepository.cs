using Domain;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Database.Repositories
{
    public class AdRepository : IAdRepository
    {
        private readonly RealEstateAdvertisingDbContext _context;

        public AdRepository(RealEstateAdvertisingDbContext context)
        {
            _context = context;
        }

        public Ad[] GetAll(int pageIndex = 0, int pageSize = 12)
        {
            return _context.Ads.ToArray();

        }

        public Ad? GetById(int id)
        {
            return _context.Ads.Find(id);
        }
    }
}
