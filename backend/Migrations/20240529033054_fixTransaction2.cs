using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class fixTransaction2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Invoices_TransactionId",
                table: "Invoices");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_TransactionId",
                table: "Invoices",
                column: "TransactionId",
                unique: true,
                filter: "[TransactionId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Invoices_TransactionId",
                table: "Invoices");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_TransactionId",
                table: "Invoices",
                column: "TransactionId");
        }
    }
}
