namespace backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string TransactionID { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public string ConfirmationCodes { get; set; }
        public Invoice? Invoice { get; set; }
    }
}
