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

        private AdDTO mapAdToAdDTO(Ad ad)
        {
            return new AdDTO
            {
                Id = ad.Id,
                Title = ad.Title,
                Description = ad.Description,
                Address = ad.Address,
                Price = ad.Price,
                RoomCount = ad.RoomCount,
                Area = ad.Area,
                CreatedAt = ad.CreatedAt,
                Image = ad.Image,
            };
        }

        public AdRepository(RealEstateDbContext context)
        {
            _context = context;
        }

        public IEnumerable<AdDTO> GetAds(string userName = "", int pageIndex = 1, int pageSize = 12)
        {
            if (string.IsNullOrEmpty(userName))
            {
                return _context.Ads
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .Select(mapAdToAdDTO)
                    .ToList();
            }
            else
            {
                return _context.Ads
                    .Include(ad => ad.Owner)
                    .Where(ad => ad.Owner.UserName == userName)
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .Select(mapAdToAdDTO)
                    .ToList();
            }
        }

        public Ad? GetAdById(int id)
        {
            return _context.Ads
                .Include(ad => ad.Owner)
                .Where(ad => ad.Id == id).SingleOrDefault();
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

        public Ad CreateAd(CreateAdDTO ad, string userName)
        {
            var dbUser = _context.Users.Where(u => u.UserName == userName).FirstOrDefault();

            if (dbUser == null)
            {
                throw new KeyNotFoundException();
            }

            var dbAd = new Ad
            {
                Title = ad.Title,
                Description = ad.Description,
                Price = ad.Price,
                RoomCount = ad.RoomCount,
                Address = ad.Address,
                Area = ad.Area,
                CreatedAt = DateTime.Now,
                Image = ad.Image,
                Owner = dbUser,
            };

            dbAd = _context.Ads.Add(dbAd).Entity;
            _context.SaveChanges();
            return dbAd;
        }

        public Ad EditAd(EditAdDTO ad)
        {
            var dbAd = _context.Ads.Find(ad.Id);

            if (dbAd == null)
            {
                throw new ArgumentException("Ad was not found");
            }

            dbAd.Title = ad.Title;
            dbAd.Description = ad.Description;
            dbAd.Price = ad.Price;
            dbAd.RoomCount = ad.RoomCount;
            dbAd.Address = ad.Address;
            dbAd.Area = ad.Area;
            dbAd.Image = ad.Image;

            _context.SaveChanges();
            return dbAd;
        }

        public bool HasEntriesOnThatPage(string userName = "", int pageIndex = 0, int pageSize = 12)
        {
            if (string.IsNullOrEmpty(userName))
            {
                return _context.Ads
                    .Skip(pageIndex * pageSize)
                    .Take(1)
                    .Select(mapAdToAdDTO)
                    .Any();
            }
            else
            {
                return _context.Ads
                    .Include(ad => ad.Owner)
                    .Where(ad => ad.Owner.UserName == userName)
                    .Skip(pageIndex * pageSize)
                    .Take(1)
                    .Select(mapAdToAdDTO)
                    .Any();
            }
        }
    }
}
