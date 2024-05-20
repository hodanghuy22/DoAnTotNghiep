namespace backend.Models
{
    public class Product
    {
        //Dung chung
        public int Id { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        //Dung cho dien thoai, tai nghe khong day, sac du phong
        public string Size { get; set; }
        public string Weight { get; set; }
        public string Chip { get; set; }
        public string Battery { get; set; }
        public string ChargingTime { get; set; }
        //Dung cho tai nghe va sac du phong
        public string Accessibility { get; set; }
        public string Controls { get; set; }

        //Phone
        public string Screen { get; set; }
        public string OS { get; set; }
        public string RAM { get; set; }
        public string ROM { get; set; }
        public string FrontCamera { get; set; }
        public string RearCamera { get; set; }
        //Sac Du Phong
        public string BatteryCore { get; set; }
        public string ChargingEfficiency { get; set; }
        public string Input { get; set; }
        public string Output { get; set; }
        public string Features { get; set; }
        //Tai nghe khong day
        public string AudioTechnology { get; set; }
        public string ChargingCase { get; set; }
        public string Connectivity { get; set; }
        public bool Status { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public List<ProductDetail> ProductDetails { get; set; }
        public List<Image> Images { get; set; }
    }
}
