namespace Domain.DTOs
{
    public class AdDTO
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
