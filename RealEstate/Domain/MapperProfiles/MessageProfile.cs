using AutoMapper;
using Domain.DTOs;
using Domain.Models;

namespace Domain.MapperProfiles
{
    public class MessageProfile : Profile
    {
        public MessageProfile()
        {
            CreateMap<Message, MessageDTO>();
        }
    }
}