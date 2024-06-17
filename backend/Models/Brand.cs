using Newtonsoft.Json;

namespace backend.Models
{
    public class Brand
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ImagePublicId { get; set; }
        public string ImageUrl { get; set; }
        public bool Status { get; set; }
        [JsonIgnore]
        public List<Product> Products { get; set; }
    }
}
