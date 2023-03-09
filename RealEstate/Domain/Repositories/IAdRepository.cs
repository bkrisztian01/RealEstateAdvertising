using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAdRepository
    {
        Ad? GetById(int id);
        Ad[] GetAll(int pageIndex = 0, int pageSize = 12);
    }
}
