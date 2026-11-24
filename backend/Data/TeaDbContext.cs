using Microsoft.EntityFrameworkCore;
using TheTeaStory.API.Models;

namespace TheTeaStory.API.Data
{
    public class TeaDbContext : DbContext
    {
        public TeaDbContext(DbContextOptions<TeaDbContext> options) : base(options) { }

        public DbSet<Product> Products => Set<Product>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<OrderItem> OrderItems => Set<OrderItem>();
        public DbSet<Coupon> Coupons => Set<Coupon>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Price).HasPrecision(10, 2);
                entity.Property(e => e.OriginalPrice).HasPrecision(10, 2);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Subtotal).HasPrecision(10, 2);
                entity.Property(e => e.Discount).HasPrecision(10, 2);
                entity.Property(e => e.Tax).HasPrecision(10, 2);
                entity.Property(e => e.ShippingCost).HasPrecision(10, 2);
                entity.Property(e => e.TotalAmount).HasPrecision(10, 2);
                entity.HasMany(e => e.Items).WithOne().HasForeignKey(i => i.OrderId);
            });

            modelBuilder.Entity<Coupon>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Code).IsUnique();
                entity.Property(e => e.Value).HasPrecision(10, 2);
                entity.Property(e => e.MinSpend).HasPrecision(10, 2);
            });
        }
    }
}
