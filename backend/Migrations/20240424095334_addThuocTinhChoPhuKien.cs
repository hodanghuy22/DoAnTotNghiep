using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class addThuocTinhChoPhuKien : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HieuSuatSac",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KhoiLuong",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguonRa",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NguonVao",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThoiGianHopSac",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThoiGianNghe",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThoiGianSacDayPin",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TienIch",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TuongThich",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HieuSuatSac",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "KhoiLuong",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "NguonRa",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "NguonVao",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ThoiGianHopSac",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ThoiGianNghe",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ThoiGianSacDayPin",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "TienIch",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "TuongThich",
                table: "Products");
        }
    }
}
