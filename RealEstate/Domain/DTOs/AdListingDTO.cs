using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public class AdListingDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public int Price { get; set; }
        public int RoomCount { get; set; }
        public int Area { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Image { get; set; }    // Use Base64 representation
    }
}
