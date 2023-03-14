using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Database.Repositories
{
    public class AdRepository : IAdRepository
    {
        private readonly RealEstateDbContext _context;

        public AdRepository(RealEstateDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Ad> GetAds(int pageIndex = 0, int pageSize = 12)
        {
            return _context.Ads.Skip(pageIndex * pageSize).Take(pageSize).ToList();

        }

        public Ad GetAdById(int id)
        {
            return _context.Ads.Find(id);
        }

        public void DeleteAdById(int id)
        {
            Ad ad = _context.Ads.Find(id);
            if (ad == null)
                return;

            _context.Ads.Remove(ad);
            _context.SaveChanges();
        }

        public void AddAd(Ad ad)
        {
            _context.Ads.Add(ad);
        }
    }
}
