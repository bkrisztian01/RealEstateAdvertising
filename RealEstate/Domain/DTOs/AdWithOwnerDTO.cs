namespace Domain.DTOs
{
    public class AdWithOwnerDTO : AdDTO
    {
        public UserDTO Owner { get; set; }
    }
}