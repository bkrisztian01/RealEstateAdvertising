using Domain.DTOs;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Repositories
{
    public class AdRepository : IAdRepository
    {
        private readonly RealEstateDbContext _context;

        private AdListingDTO mapAdToAdListingDTO(Ad ad)
        {
            return new AdListingDTO
            {
                Id          = ad.Id,
                Title       = ad.Title,
                Description = ad.Description,
                Address     = ad.Address,
                Price       = ad.Price,
                RoomCount   = ad.RoomCount,
                Area        = ad.Area,
                CreatedAt   = ad.CreatedAt,
                Image       = ad.Image,
            };
        }

        public AdRepository(RealEstateDbContext context)
        {
            _context = context;
        }

        public IEnumerable<AdListingDTO> GetAds(string userName = "", int pageIndex = 0, int pageSize = 12)
        {
            if (string.IsNullOrEmpty(userName))
            {
                return _context.Ads
                    .Skip(pageIndex * pageSize)
                    .Take(pageSize)
                    .Select(mapAdToAdListingDTO)
                    .ToList();
            }
            else
            {
                return _context.Ads
                    .Include(ad => ad.Owner)
                    .Where(ad => ad.Owner.UserName == userName)
                    .Skip(pageIndex * pageSize)
                    .Take(pageSize)
                    .Select(mapAdToAdListingDTO)
                    .ToList();
            }
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

        public Ad CreateAd(AdListingDTO ad, string userName)
        {
            var dbUser = _context.Users.Where(u => u.UserName == userName).FirstOrDefault();

            if (dbUser == null)
            {
                throw new KeyNotFoundException();
            }

            var dbAd = new Ad
            {
                Title       = ad.Title,
                Description = ad.Description,
                Price       = ad.Price,
                RoomCount   = ad.RoomCount,
                Address     = ad.Address,
                Area        = ad.Area,
                CreatedAt   = ad.CreatedAt,
                Image       = ad.Image,
                Owner       = dbUser,
            };

            dbAd = _context.Ads.Add(dbAd).Entity;
            _context.SaveChanges();
            return dbAd;
        }
    }
}
