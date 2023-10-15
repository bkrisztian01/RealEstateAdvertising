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
            SubscriptionTier tier = _context.SubscriptionTiers.Find(tierId);
            if (tier == null)
            {
                throw new NotFoundException("Tier was not found");
            }

            User user = _context.Users.Where(u => u.UserName == userName).First();

            Subscription sub = new Subscription();
            sub.Tier = tier;
            sub.User = user;
            sub.ValidUntil = DateTime.Now.AddMonths(1);
            _context.Subscriptions.Add(sub);
            _context.SaveChanges();
        }
    }
}