namespace Domain.DTOs
{
    public class AdListDTO
    {
        public bool HasMore { get; set; } = false;
        public IEnumerable<AdDTO> Ads { get; set; }
    }
}