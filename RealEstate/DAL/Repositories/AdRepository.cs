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

            return query
                .OrderByDescending(ad => ad.Highlighted)
                .ThenByDescending(ad => ad.CreatedAt)
                .Skip((parameters.PageIndex - 1) * parameters.PageSize)
                .Take(parameters.PageSize)
                .Select(a => _mapper.Map<AdDTO>(a))
                .ToArray();
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
            var dbUser = _context.Users.Where(u => u.UserName == userName).FirstOrDefault()
                ?? throw new NotFoundException("User was not found");

            if (ad.Highlighted && !CanHighlightAd(userName))
            {
                throw new ArgumentException("Can't highlight ad");
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
            var dbAd = _context.Ads.Include(a => a.Owner).Where(a => a.Id == ad.Id).FirstOrDefault()
                ?? throw new NotFoundException("Ad was not found");

            if (ad.Highlighted && !dbAd.Highlighted && !CanHighlightAd(dbAd.Owner.UserName!))
            {
                throw new ArgumentException("Can't highlight ad");
            }

            dbAd.Title = ad.Title;
            dbAd.Description = ad.Description;
            dbAd.Price = ad.Price;
            dbAd.RoomCount = ad.RoomCount;
            dbAd.Address = ad.Address;
            dbAd.Area = ad.Area;
            dbAd.Image = ad.Image;
            dbAd.Highlighted = ad.Highlighted;

            _context.SaveChanges();
            return dbAd;
        }

        public bool HasMoreEntries(GetAdsParameters parameters)
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

        public bool CanHighlightAd(string userName)
        {
            int hightlightedAdsCount = _context.Ads
                .Where(a => a.Highlighted && a.Owner.UserName == userName)
                .Count();

            int maxHighlightedAds = _context.Subscriptions
                .Include(s => s.Tier)
                .Include(s => s.User)
                .Where(s => s.User.UserName == userName)
                .Select(s => s.Tier.MaxHighlightedAds)
                .ToArray()
                .FirstOrDefault(0);

            return hightlightedAdsCount < maxHighlightedAds;
        }
    }
}
