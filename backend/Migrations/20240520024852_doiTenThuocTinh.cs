using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class doiTenThuocTinh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_ProductDetails_ProductDetailId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductDetails_Capacitys_CapacityId",
                table: "ProductDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Capacitys",
                table: "Capacitys");

            migrationBuilder.RenameTable(
                name: "Capacitys",
                newName: "Capacities");

            migrationBuilder.RenameColumn(
                name: "NgayDang",
                table: "Ratings",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Ratings",
                newName: "Review");

            migrationBuilder.RenameColumn(
                name: "TuongThich",
                table: "Products",
                newName: "Weight");

            migrationBuilder.RenameColumn(
                name: "TienIch",
                table: "Products",
                newName: "Size");

            migrationBuilder.RenameColumn(
                name: "ThoiGianSacDayPin",
                table: "Products",
                newName: "Screen");

            migrationBuilder.RenameColumn(
                name: "ThoiGianNghe",
                table: "Products",
                newName: "RearCamera");

            migrationBuilder.RenameColumn(
                name: "ThoiGianHopSac",
                table: "Products",
                newName: "Output");

            migrationBuilder.RenameColumn(
                name: "Pin",
                table: "Products",
                newName: "OS");

            migrationBuilder.RenameColumn(
                name: "NguonVao",
                table: "Products",
                newName: "Input");

            migrationBuilder.RenameColumn(
                name: "NguonRa",
                table: "Products",
                newName: "FrontCamera");

            migrationBuilder.RenameColumn(
                name: "LoaiMan",
                table: "Products",
                newName: "Features");

            migrationBuilder.RenameColumn(
                name: "KichThuoc",
                table: "Products",
                newName: "Controls");

            migrationBuilder.RenameColumn(
                name: "KhoiLuong",
                table: "Products",
                newName: "Connectivity");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Products",
                newName: "Chip");

            migrationBuilder.RenameColumn(
                name: "ImagePublicId",
                table: "Products",
                newName: "ChargingTime");

            migrationBuilder.RenameColumn(
                name: "HieuSuatSac",
                table: "Products",
                newName: "ChargingEfficiency");

            migrationBuilder.RenameColumn(
                name: "DoPhanGiai",
                table: "Products",
                newName: "ChargingCase");

            migrationBuilder.RenameColumn(
                name: "CameraTruoc",
                table: "Products",
                newName: "BatteryCore");

            migrationBuilder.RenameColumn(
                name: "CameraSau",
                table: "Products",
                newName: "Battery");

            migrationBuilder.RenameColumn(
                name: "CPU",
                table: "Products",
                newName: "AudioTechnology");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "InvoiceDetails",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "ProductDetailId",
                table: "Images",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_ProductDetailId",
                table: "Images",
                newName: "IX_Images_ProductId");

            migrationBuilder.RenameColumn(
                name: "NgayDang",
                table: "Comments",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "HinhUrl",
                table: "Brands",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "HinhPublicId",
                table: "Brands",
                newName: "ImagePublicId");

            migrationBuilder.AddColumn<string>(
                name: "Accessibility",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Capacities",
                table: "Capacities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Products_ProductId",
                table: "Images",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductDetails_Capacities_CapacityId",
                table: "ProductDetails",
                column: "CapacityId",
                principalTable: "Capacities",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Products_ProductId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductDetails_Capacities_CapacityId",
                table: "ProductDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Capacities",
                table: "Capacities");

            migrationBuilder.DropColumn(
                name: "Accessibility",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "Capacities",
                newName: "Capacitys");

            migrationBuilder.RenameColumn(
                name: "Review",
                table: "Ratings",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Ratings",
                newName: "NgayDang");

            migrationBuilder.RenameColumn(
                name: "Weight",
                table: "Products",
                newName: "TuongThich");

            migrationBuilder.RenameColumn(
                name: "Size",
                table: "Products",
                newName: "TienIch");

            migrationBuilder.RenameColumn(
                name: "Screen",
                table: "Products",
                newName: "ThoiGianSacDayPin");

            migrationBuilder.RenameColumn(
                name: "RearCamera",
                table: "Products",
                newName: "ThoiGianNghe");

            migrationBuilder.RenameColumn(
                name: "Output",
                table: "Products",
                newName: "ThoiGianHopSac");

            migrationBuilder.RenameColumn(
                name: "OS",
                table: "Products",
                newName: "Pin");

            migrationBuilder.RenameColumn(
                name: "Input",
                table: "Products",
                newName: "NguonVao");

            migrationBuilder.RenameColumn(
                name: "FrontCamera",
                table: "Products",
                newName: "NguonRa");

            migrationBuilder.RenameColumn(
                name: "Features",
                table: "Products",
                newName: "LoaiMan");

            migrationBuilder.RenameColumn(
                name: "Controls",
                table: "Products",
                newName: "KichThuoc");

            migrationBuilder.RenameColumn(
                name: "Connectivity",
                table: "Products",
                newName: "KhoiLuong");

            migrationBuilder.RenameColumn(
                name: "Chip",
                table: "Products",
                newName: "ImageUrl");

            migrationBuilder.RenameColumn(
                name: "ChargingTime",
                table: "Products",
                newName: "ImagePublicId");

            migrationBuilder.RenameColumn(
                name: "ChargingEfficiency",
                table: "Products",
                newName: "HieuSuatSac");

            migrationBuilder.RenameColumn(
                name: "ChargingCase",
                table: "Products",
                newName: "DoPhanGiai");

            migrationBuilder.RenameColumn(
                name: "BatteryCore",
                table: "Products",
                newName: "CameraTruoc");

            migrationBuilder.RenameColumn(
                name: "Battery",
                table: "Products",
                newName: "CameraSau");

            migrationBuilder.RenameColumn(
                name: "AudioTechnology",
                table: "Products",
                newName: "CPU");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "InvoiceDetails",
                newName: "TotalPrice");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Images",
                newName: "ProductDetailId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_ProductId",
                table: "Images",
                newName: "IX_Images_ProductDetailId");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Comments",
                newName: "NgayDang");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Brands",
                newName: "HinhUrl");

            migrationBuilder.RenameColumn(
                name: "ImagePublicId",
                table: "Brands",
                newName: "HinhPublicId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Capacitys",
                table: "Capacitys",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_ProductDetails_ProductDetailId",
                table: "Images",
                column: "ProductDetailId",
                principalTable: "ProductDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductDetails_Capacitys_CapacityId",
                table: "ProductDetails",
                column: "CapacityId",
                principalTable: "Capacitys",
                principalColumn: "Id");
        }
    }
}
