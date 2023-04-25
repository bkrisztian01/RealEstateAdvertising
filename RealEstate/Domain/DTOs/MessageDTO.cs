namespace Domain.DTOs
{
    public class MessageDTO
    {
        public bool IsUnread { get; set; }
        public string Content { get; set; }
        public UserDTO FromUser { get; set; }
        public UserDTO ToUser { get; set; }
    }
}