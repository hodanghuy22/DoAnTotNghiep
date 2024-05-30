namespace backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string TransactionId { get; set; }
        public string PayPalOrderId { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public Invoice? Invoice { get; set; }
    }
}
