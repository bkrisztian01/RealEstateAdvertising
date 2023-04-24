using AutoMapper;
using Domain.DTOs;
using Domain.Models;

namespace Domain.MapperProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<SignUpDTO, User>();
        }
    }
}