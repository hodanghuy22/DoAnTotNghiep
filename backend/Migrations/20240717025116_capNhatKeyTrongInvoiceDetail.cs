using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class capNhatKeyTrongInvoiceDetail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_InvoiceDetails",
                table: "InvoiceDetails");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InvoiceDetails",
                table: "InvoiceDetails",
                columns: new[] { "InvoiceId", "ProductDetailId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_InvoiceDetails",
                table: "InvoiceDetails");

            migrationBuilder.AddPrimaryKey(
                name: "PK_InvoiceDetails",
                table: "InvoiceDetails",
                column: "Id");

        }
    }
}
