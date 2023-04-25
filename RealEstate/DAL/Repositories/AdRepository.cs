using AutoMapper;
using Domain;
using Domain.DTOs;
using Domain.Models;
using Domain.Repositories;
using Domain.Services.Parameters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Repositories
{
    public class AdRepository : IAdRepository
    {
        private readonly RealEstateDbContext _context;
        private readonly IMapper _mapper;

        private AdDTO MapAdToAdDTO(Ad ad)
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

        public AdRepository(RealEstateDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<AdDTO> GetAds(GetAdsParameters parameters)
        {
            var query = _context.Ads
                .Where(ad => parameters.MinPrice <= ad.Price && ad.Price <= parameters.MaxPrice)
                .Where(ad => parameters.MinArea <= ad.Area && ad.Area <= parameters.MaxArea)
                .Where(ad => parameters.MinRoomCount <= ad.RoomCount && ad.RoomCount <= parameters.MaxRoomCount);

            if (!string.IsNullOrEmpty(parameters.UserName))
            {
                query = query.Where(ad => ad.Owner.UserName == parameters.UserName);
            }
            if (!string.IsNullOrEmpty(parameters.Address))
            {
                query = query.Where(ad => ad.Address.Contains(parameters.Address));
            }

            var asd = query
                .OrderByDescending(ad => ad.CreatedAt.Date)
                .Skip((parameters.PageIndex - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .Select(MapAdToAdDTO)
                .ToArray();

            return asd;
        }

        public Ad? GetAdById(int id)
        {
            return _context.Ads
                .Include(ad => ad.Owner)
                .Where(ad => ad.Id == id).SingleOrDefault();
        }

        public void DeleteAdById(int id)
        {
            Ad? ad = _context.Ads.Find(id);
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
                throw new NotFoundException("User was not found");
            }

            var dbAd = _mapper.Map<Ad>(ad);
            dbAd.CreatedAt = DateTime.Now;
            dbAd.Owner = dbUser;

            dbAd = _context.Ads.Add(dbAd).Entity;
            _context.SaveChanges();
            return dbAd;
        }

        public Ad EditAd(EditAdDTO ad)
        {
            var dbAd = _context.Ads.Find(ad.Id);

            if (dbAd == null)
            {
                throw new NotFoundException("Ad was not found");
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

        public bool HasEntriesOnThatPage(GetAdsParameters parameters)
        {
            var query = _context.Ads
                .Where(ad => parameters.MinPrice <= ad.Price && ad.Price <= parameters.MaxPrice)
                .Where(ad => parameters.MinArea <= ad.Area && ad.Area <= parameters.MaxArea)
                .Where(ad => parameters.MinRoomCount <= ad.RoomCount && ad.RoomCount <= parameters.MaxRoomCount);

            if (!string.IsNullOrEmpty(parameters.UserName))
            {
                query = query.Where(ad => ad.Owner.UserName == parameters.UserName);
            }
            if (!string.IsNullOrEmpty(parameters.Address))
            {
                query = query.Where(ad => ad.Address.Contains(parameters.Address));
            }

            return query
                .OrderByDescending(ad => ad.CreatedAt.Date)
                .Skip(parameters.PageIndex * parameters.PageSize)
                .Take(parameters.PageSize)
                .Any();
        }
    }
}
