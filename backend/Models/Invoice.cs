using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public string ShippingInfo { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public int TotalPrice { get; set; }
        public int TotalPriceAfterDiscount { get; set; }
        public int? CouponId { get; set; }
        public Coupon Coupon { get; set; }
        public bool Paid { get; set; }
        public int OrderStatusId { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public List<InvoiceDetail> InvoiceDetails { get; set; }
    }
}
