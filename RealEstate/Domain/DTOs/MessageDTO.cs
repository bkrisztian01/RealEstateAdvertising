namespace Domain.DTOs
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public bool IsUnread { get; set; }
        public string Content { get; set; }
        public UserDTO FromUser { get; set; }
        public UserDTO ToUser { get; set; }
        public DateTime Date { get; set; }
    }
}