namespace Domain.DTOs
{
    public class MessageContactDTO
    {
        public UserDTO User { get; set; }
        public DateTime LastMessageDate { get; set; }
        public int UnreadCount { get; set; }
    }
}