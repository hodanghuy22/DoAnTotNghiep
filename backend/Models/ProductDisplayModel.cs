namespace backend.Models
{
    public class ProductDisplayModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AverageRating { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public string ImagePublicId { get; set; }
        public string ImageUrl { get; set; }
        public string BrandTitle { get; set; }
        public string CategoryTitle { get; set; }
    }
}
