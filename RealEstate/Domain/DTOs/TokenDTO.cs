using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public class TokenDTO
    {
        public string AccessToken { get; set; }
        public int ExpiresIn { get; set; }
        public string UserName { get; set; }
    }
}
