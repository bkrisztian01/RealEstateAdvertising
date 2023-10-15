using AutoMapper;
using Domain.DTOs;
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
    }
}