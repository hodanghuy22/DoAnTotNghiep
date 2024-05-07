using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddImportInvoiceAndSupplier : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "ProductDetails",
                newName: "RetailPrice");

            migrationBuilder.AddColumn<int>(
                name: "CostPrice",
                table: "ProductDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImportInvoices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateOfReceipt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalPrice = table.Column<int>(type: "int", nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImportInvoices_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ImportInvoiceDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImportInvoiceId = table.Column<int>(type: "int", nullable: false),
                    ProductDetailId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CostPrice = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImportInvoiceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImportInvoiceDetails_ImportInvoices_ImportInvoiceId",
                        column: x => x.ImportInvoiceId,
                        principalTable: "ImportInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImportInvoiceDetails_ProductDetails_ProductDetailId",
                        column: x => x.ProductDetailId,
                        principalTable: "ProductDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImportInvoiceDetails_ImportInvoiceId",
                table: "ImportInvoiceDetails",
                column: "ImportInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_ImportInvoiceDetails_ProductDetailId",
                table: "ImportInvoiceDetails",
                column: "ProductDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_ImportInvoices_SupplierId",
                table: "ImportInvoices",
                column: "SupplierId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImportInvoiceDetails");

            migrationBuilder.DropTable(
                name: "ImportInvoices");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropColumn(
                name: "CostPrice",
                table: "ProductDetails");

            migrationBuilder.RenameColumn(
                name: "RetailPrice",
                table: "ProductDetails",
                newName: "Price");
        }
    }
}
