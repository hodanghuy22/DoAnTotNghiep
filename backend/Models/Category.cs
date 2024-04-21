namespace backend.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Status { get; set; }
        public List<Product> Products { get; set; }
    }
}
