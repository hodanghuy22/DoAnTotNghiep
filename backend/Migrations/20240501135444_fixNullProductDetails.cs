using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class fixNullProductDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductDetails_Capacitys_CapacityId",
                table: "ProductDetails");

            migrationBuilder.AlterColumn<int>(
                name: "CapacityId",
                table: "ProductDetails",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductDetails_Capacitys_CapacityId",
                table: "ProductDetails",
                column: "CapacityId",
                principalTable: "Capacitys",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductDetails_Capacitys_CapacityId",
                table: "ProductDetails");

            migrationBuilder.AlterColumn<int>(
                name: "CapacityId",
                table: "ProductDetails",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductDetails_Capacitys_CapacityId",
                table: "ProductDetails",
                column: "CapacityId",
                principalTable: "Capacitys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
