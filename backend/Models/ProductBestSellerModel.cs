namespace backend.Models
{
    public class ProductBestSellerModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int ProductAverageRating { get; set; }
        public int SoldQuantity { get; set; }
        public string BrandTitle { get; set; }
        public string CategoryTitle { get; set; }
    }
}
