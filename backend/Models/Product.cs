namespace backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Desc { get; set; }
        public string LoaiMan { get; set; }
        public string KichThuoc { get; set; }
        public string KhoiLuong { get; set; }
        public string DoPhanGiai { get; set; }
        public string CPU { get; set; }
        public string RAM { get; set; }
        public string ROM { get; set; }
        public string CameraTruoc { get; set; }
        public string CameraSau { get; set; }
        public string Pin { get; set; }
        public string HieuSuatSac { get; set; }
        public string ThoiGianSacDayPin { get; set; }
        public string NguonVao { get; set; }
        public string NguonRa { get; set; }
        public string TienIch { get; set; }
        public string ThoiGianNghe { get; set; }
        public string ThoiGianHopSac { get; set; }
        public string TuongThich { get; set; }
        public int Price { get; set; } = 0;
        public bool Status { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public List<ProductDetail> ProductDetails { get; set; }
        public string ImagePublicId { get; set; }
        public string ImageUrl { get; set; }
    }
}
