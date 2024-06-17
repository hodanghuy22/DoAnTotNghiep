using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class addInvoiceInNotification : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InvoiceId",
                table: "Notifications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_InvoiceId",
                table: "Notifications",
                column: "InvoiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Invoices_InvoiceId",
                table: "Notifications",
                column: "InvoiceId",
                principalTable: "Invoices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Invoices_InvoiceId",
                table: "Notifications");

            migrationBuilder.DropIndex(
                name: "IX_Notifications_InvoiceId",
                table: "Notifications");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "Notifications");
        }
    }
}
