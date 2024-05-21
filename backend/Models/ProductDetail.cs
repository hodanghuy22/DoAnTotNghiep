namespace backend.Models
{
    public class ProductDetail
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public int RetailPrice { get; set; }
        public int CostPrice { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int? CapacityId { get; set; }
        public Capacity? Capacity { get; set; }
        public int ColorId { get; set; }
        public Color Color { get; set; }
        public bool Status { get; set; }
    }
}
