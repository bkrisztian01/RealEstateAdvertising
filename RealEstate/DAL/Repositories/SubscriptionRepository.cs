using System.Globalization;
using AutoMapper;
using Domain;
using Domain.DTOs;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private readonly RealEstateDbContext _context;
        private readonly IMapper _mapper;

        public SubscriptionRepository(RealEstateDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public IEnumerable<SubscriptionTierDTO> GetAllTiers()
        {
            return _context.SubscriptionTiers.Select((tier) => _mapper.Map<SubscriptionTierDTO>(tier)).ToArray();
        }

        public void SubscribeToTier(int tierId, string userName)
        {
            bool alreadySubscribed = _context.Subscriptions.Any(s => s.User.UserName == userName);
            if (alreadySubscribed)
            {
                throw new ArgumentException("User is already subscribed");
            }

            SubscriptionTier? tier = _context.SubscriptionTiers.Find(tierId);
            if (tier == null)
            {
                throw new NotFoundException("Tier was not found");
            }

            User user = _context.Users.Where(u => u.UserName == userName).First();

            Subscription sub = new Subscription
            {
                Tier = tier,
                User = user,
                ValidUntil = DateTime.Now.AddMonths(1)
            };
            _context.Subscriptions.Add(sub);
            _context.SaveChanges();
        }

        public SubscriptionDTO? GetUsersSubscription(string userName)
        {
            return _context.Subscriptions.Include(s => s.User)
                            .Include(s => s.Tier)
                            .Where(s => s.User.UserName == userName)
                            .Select(s => _mapper.Map<SubscriptionDTO>(s))
                            .FirstOrDefault();
        }

        public void CheckSubscriptions()
        {
            var subs = _context.Subscriptions
                .Include(s => s.User)
                .Where(s => s.ValidUntil < DateTime.Now)
                .ToArray();

            foreach (var sub in subs)
            {
                var ads = _context.Ads
                    .Where(a => a.Highlighted)
                    .Where(a => a.Owner.UserName == sub.User.UserName)
                    .ToArray();

                foreach (var ad in ads)
                {
                    ad.Highlighted = false;
                }
                _context.Subscriptions.Remove(sub);
            }
            _context.SaveChanges();
        }
    }
}