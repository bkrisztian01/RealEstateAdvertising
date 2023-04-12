using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.DTOs;
using Domain.Models;

namespace Domain.Repositories
{
    public interface IAdRepository
    {
        Ad? GetAdById(int id);
        IEnumerable<AdDTO> GetAds(string userName = "", int pageIndex = 0, int pageSize = 12);
        void DeleteAdById(int id);
        Ad CreateAd(CreateAdDTO ad, string userName);
        Ad EditAd(EditAdDTO ad);
        bool HasEntriesOnThatPage(string userName = "", int pageIndex = 0, int pageSize = 12);
    }
}
