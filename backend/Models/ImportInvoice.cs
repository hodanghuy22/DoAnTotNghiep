namespace backend.Models
{
    public class ImportInvoice
    {
        public int Id { get; set; }
        public DateTime DateOfReceipt { get; set; }
        public int TotalPrice { get; set; }
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public List<ImportInvoiceDetail> ImportInvoiceDetails { get; set; }
    }
}
