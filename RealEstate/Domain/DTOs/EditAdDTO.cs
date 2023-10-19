using System.ComponentModel.DataAnnotations;

namespace Domain.DTOs
{
    public class EditAdDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
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
