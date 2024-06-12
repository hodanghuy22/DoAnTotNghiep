namespace backend.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string BankCode { get; set; }
        public string BankTranNo { get; set; }
        public string TransactionNo { get; set; }
        public string TransactionStatus { get; set; }
        public string ResponseCode { get; set; }
        public string OrderInfo { get; set; }
        public string PaymentMethod { get; set; }
        public int? TxnRef { get; set; }
        public string? PayPalOrderId { get; set; }
        public int Amount { get; set; }
        public DateTime Date { get; set; }
        public Invoice? Invoice { get; set; }
    }
}
