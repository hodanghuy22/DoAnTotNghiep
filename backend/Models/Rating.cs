﻿using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }
        public string Review { get; set; }
        public int Star { get; set; }
        public DateTime Date { get; set; }
    }
}
