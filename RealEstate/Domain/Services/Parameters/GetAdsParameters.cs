namespace Domain.Services.Parameters
{
    public class GetAdsParameters
    {
        public string? UserName { get; init; }
        public string? Address { get; init; }
        public int PageIndex { get; init; } = 1;
        public int PageSize { get; init; } = 12;
        public int MinPrice { get; init; } = 0;
        public int MaxPrice { get; init; } = int.MaxValue;
        public int MinArea { get; init; } = 0;
        public int MaxArea { get; init; } = int.MaxValue;
        public int MinRoomCount { get; init; } = 0;
        public int MaxRoomCount { get; init; } = int.MaxValue;
    }
}