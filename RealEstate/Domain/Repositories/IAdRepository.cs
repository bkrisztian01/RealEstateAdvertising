using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.DTOs;
using Domain.Models;
using Domain.Services.Parameters;

namespace Domain.Repositories
{
    public interface IAdRepository
    {
        Ad? GetAdById(int id);
        IEnumerable<AdDTO> GetAds(GetAdsParameters parameters);
        void DeleteAdById(int id);
        Ad CreateAd(CreateAdDTO ad, string userName);
        Ad EditAd(EditAdDTO ad);
        bool HasEntriesOnThatPage(GetAdsParameters parameters);
    }
}
