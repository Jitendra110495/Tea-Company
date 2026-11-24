using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheTeaStory.API.Data;
using TheTeaStory.API.Models;

namespace TheTeaStory.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CouponsController : ControllerBase
    {
        private readonly TeaDbContext _context;

        public CouponsController(TeaDbContext context)
        {
            _context = context;
        }

        // GET: api/coupons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons()
        {
            return await _context.Coupons.ToListAsync();
        }

        // POST: api/coupons/validate
        [HttpPost("validate")]
        public async Task<ActionResult<Coupon>> ValidateCoupon([FromBody] ValidateCouponRequest request)
        {
            var code = request.Code.Trim().ToUpper();
            var coupon = await _context.Coupons.FirstOrDefaultAsync(c => c.Code == code && c.Active);
            
            if (coupon == null) return NotFound(new { message = "Invalid or expired promotional code." });
            return coupon;
        }

        // POST: api/coupons
        [HttpPost]
        public async Task<ActionResult<Coupon>> CreateCoupon(Coupon coupon)
        {
            coupon.Code = coupon.Code.Trim().ToUpper();
            if (string.IsNullOrEmpty(coupon.Id)) coupon.Id = $"c-{Guid.NewGuid().ToString("N")[..8]}";

            _context.Coupons.Add(coupon);
            await _context.SaveChangesAsync();

            return Ok(coupon);
        }
    }

    public class ValidateCouponRequest
    {
        public string Code { get; set; } = string.Empty;
    }
}
