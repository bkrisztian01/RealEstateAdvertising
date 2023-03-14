using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;

namespace Domain.Repositories
{
    public interface IAdRepository
    {
        Ad GetAdById(int id);
        IEnumerable<Ad> GetAds(int pageIndex = 0, int pageSize = 12);
        void DeleteAdById(int id);
    }
}
