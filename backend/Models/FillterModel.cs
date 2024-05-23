namespace backend.Models
{
    public class FillterModel
    {
        public int Top { get; set; } = 5;
        public DateTime? StartDate { get; set; } 
        public DateTime? EndDate { get; set; }
    }
}
