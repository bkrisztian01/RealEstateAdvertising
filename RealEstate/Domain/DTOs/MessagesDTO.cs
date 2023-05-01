namespace Domain.DTOs
{
    public class MessagesDTO
    {
        public UserDTO User { get; set; }
        public IEnumerable<MessageDTO> Messages { get; set; }
    }
}