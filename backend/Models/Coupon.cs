namespace TheTeaStory.API.Models
{
    public class Coupon
    {
        public string Id { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string DiscountType { get; set; } = "percentage"; // percentage, fixed
        public decimal Value { get; set; }
        public decimal MinSpend { get; set; } = 1000;
        public bool Active { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
