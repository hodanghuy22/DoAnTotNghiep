namespace backend.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string ImagePublicId { get; set; }
        public string ImageUrl { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}
