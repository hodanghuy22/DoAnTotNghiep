using System.Text.Json.Serialization;

namespace backend.Models
{
    public class InvoiceDetail
    {
        //public int Id { get; set; }
        public int InvoiceId { get; set; }
        [JsonIgnore]
        public Invoice Invoice { get; set; }
        public int ProductDetailId { get; set; }
        public ProductDetail ProductDetail { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
    }
}
