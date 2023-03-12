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
        Ad GetById(int id);
        IEnumerable<Ad> GetAll(int pageIndex = 0, int pageSize = 12);
        void DeleteById(int id);
    }
}
