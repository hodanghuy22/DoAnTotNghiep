namespace backend.Models
{
    public class ImportInvoiceDetail
    {
        public int Id { get; set; }
        public int ImportInvoiceId { get; set; }
        public ImportInvoice ImportInvoice { get; set; }
        public int ProductDetailId { get; set; }
        public ProductDetail ProductDetail { get; set; }
        public int Quantity { get; set; }
        public int CostPrice { get; set; }
    }
}
