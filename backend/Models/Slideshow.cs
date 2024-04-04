namespace backend.Models
{
    public class Slideshow
    {
        public int Id { get; set; }
        public string ImagePublicId { get; set; }
        public string ImageUrl { get; set; }
        public string ContentUrl { get; set; }
        public bool Status { get; set; }
    }
}
