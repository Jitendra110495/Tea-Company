namespace TheTeaStory.API.Models
{
    public class Order
    {
        public string Id { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal Tax { get; set; }
        public decimal ShippingCost { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = "Processing"; // Processing, Packed, Dispatched, Delivered, Cancelled
        public string ShippingAddressJson { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = "Razorpay";
        public string PaymentId { get; set; } = string.Empty;
        public string? TrackingNumber { get; set; }
        public string CourierPartner { get; set; } = "Shiprocket Luxury Express";
        public DateTime EstimatedDelivery { get; set; } = DateTime.UtcNow.AddDays(3);
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public List<OrderItem> Items { get; set; } = new();
    }

    public class OrderItem
    {
        public string Id { get; set; } = string.Empty;
        public string OrderId { get; set; } = string.Empty;
        public string ProductId { get; set; } = string.Empty;
        public string TeaFormat { get; set; } = "Loose Leaf";
        public string Sweetener { get; set; } = "Unsweetened";
        public string PackageSize { get; set; } = "100g";
        public string? CustomEngraving { get; set; }
        public decimal UnitPrice { get; set; }
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
