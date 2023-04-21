namespace Domain.DTOs
{
    public class AdWithOwnerDTO : AdDTO
    {
        public OwnerDTO Owner { get; set; }
    }
}