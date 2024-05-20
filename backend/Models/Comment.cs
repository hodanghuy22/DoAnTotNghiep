using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int ProductDetailId { get; set; }
        [JsonIgnore]
        public ProductDetail ProductDetail { get; set; }
        public int? CommentId { get; set; }
        [ForeignKey("CommentId")]
        public Comment ParentComment { get; set; }

        public ICollection<Comment> ChildComments { get; set; }
    }
}
