using AutoMapper;
using Domain.DTOs;
using Domain.Models;

namespace Domain.MapperProfiles
{
    public class AdProfile : Profile
    {
        public AdProfile()
        {
            CreateMap<Ad, AdDTO>();
            CreateMap<Ad, AdWithOwnerDTO>();
            CreateMap<CreateAdDTO, Ad>();
            CreateMap<EditAdDTO, Ad>();
        }
    }
}