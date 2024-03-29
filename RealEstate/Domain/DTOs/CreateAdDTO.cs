using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class CreateAdDTO
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public int RoomCount { get; set; }
        [Required]
        public int Area { get; set; }
        [Required]
        public string Image { get; set; }    // Use Base64 representation
        [Required]
        public bool Highlighted { get; set; }
    }
}
