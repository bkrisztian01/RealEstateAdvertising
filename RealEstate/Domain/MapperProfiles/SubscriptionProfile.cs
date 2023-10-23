using AutoMapper;
using Domain.DTOs;
using Domain.Models;

namespace Domain.MapperProfiles
{
    public class SubscriptionProfile : Profile
    {
        public SubscriptionProfile()
        {
            CreateMap<SubscriptionTier, SubscriptionTierDTO>();
            CreateMap<Subscription, SubscriptionDTO>();
        }
    }
}