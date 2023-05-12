namespace Domain.DTOs
{
    public class MessageContactListDTO
    {
        public bool HasMore { get; set; } = false;
        public IEnumerable<MessageContactDTO> MessageContacts { get; set; }
    }
}