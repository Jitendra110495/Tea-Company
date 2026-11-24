namespace TheTeaStory.API.Models
{
    public class Product
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // e.g. Black Tea, Green Tea, Herbal Tea
        public string Collection { get; set; } = string.Empty; // e.g. Signature, Single Origin, Reserve
        public decimal Price { get; set; }
        public decimal? OriginalPrice { get; set; }
        public double Rating { get; set; } = 5.0;
        public int ReviewCount { get; set; } = 0;
        public string ImageUrl { get; set; } = string.Empty;
        public List<string> Gallery { get; set; } = new();
        public string Description { get; set; } = string.Empty;
        public string Origin { get; set; } = string.Empty;
        public string Elevation { get; set; } = string.Empty;
        public string Flush { get; set; } = string.Empty;
        public List<string> Ingredients { get; set; } = new();
        public List<string> TasteNotes { get; set; } = new();
        public string Aroma { get; set; } = string.Empty;
        public string Caffeine { get; set; } = "Medium";
        public List<string> Benefits { get; set; } = new();
        
        public string WaterTemp { get; set; } = "95°C";
        public string SteepTime { get; set; } = "3 mins";
        public int TimerSeconds { get; set; } = 180;
        public string ServingSize { get; set; } = "2g per 200ml";
        
        public bool InStock { get; set; } = true;
        public int StockQuantity { get; set; } = 50;
        public bool IsBestSeller { get; set; } = false;
        public bool IsNew { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
