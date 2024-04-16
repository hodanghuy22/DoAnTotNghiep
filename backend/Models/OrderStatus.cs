namespace backend.Models
{
    public class OrderStatus
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }
        public List<Invoice> Invoices { get; set; }
    }
}
