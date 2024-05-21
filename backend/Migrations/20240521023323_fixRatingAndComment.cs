using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class fixRatingAndComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_ProductDetails_ProductDetailId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_ProductDetails_ProductDetailId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "ProductDetails");

            migrationBuilder.DropColumn(
                name: "SoldQuantity",
                table: "ProductDetails");

            migrationBuilder.DropColumn(
                name: "Paid",
                table: "Invoices");

            migrationBuilder.RenameColumn(
                name: "ProductDetailId",
                table: "Ratings",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_ProductDetailId",
                table: "Ratings",
                newName: "IX_Ratings_ProductId");

            migrationBuilder.RenameColumn(
                name: "ProductDetailId",
                table: "Comments",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_ProductDetailId",
                table: "Comments",
                newName: "IX_Comments_ProductId");

            migrationBuilder.AddColumn<int>(
                name: "AverageRating",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SoldQuantity",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Products_ProductId",
                table: "Comments",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Products_ProductId",
                table: "Ratings",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Products_ProductId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Products_ProductId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SoldQuantity",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Ratings",
                newName: "ProductDetailId");

            migrationBuilder.RenameIndex(
                name: "IX_Ratings_ProductId",
                table: "Ratings",
                newName: "IX_Ratings_ProductDetailId");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Comments",
                newName: "ProductDetailId");

            migrationBuilder.RenameIndex(
                name: "IX_Comments_ProductId",
                table: "Comments",
                newName: "IX_Comments_ProductDetailId");

            migrationBuilder.AddColumn<int>(
                name: "AverageRating",
                table: "ProductDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SoldQuantity",
                table: "ProductDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Paid",
                table: "Invoices",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_ProductDetails_ProductDetailId",
                table: "Comments",
                column: "ProductDetailId",
                principalTable: "ProductDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_ProductDetails_ProductDetailId",
                table: "Ratings",
                column: "ProductDetailId",
                principalTable: "ProductDetails",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
