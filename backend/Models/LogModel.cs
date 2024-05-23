namespace backend.Models
{
    public class LogModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string Action { get; set; }
        public DateTime Date { get; set; }
        public string Object { get; set; }
        public string ObjectId { get; set; }
    }
}
