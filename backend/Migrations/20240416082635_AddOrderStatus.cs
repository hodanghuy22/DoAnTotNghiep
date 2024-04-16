using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddOrderStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderStatus",
                table: "Invoices");

            migrationBuilder.AddColumn<int>(
                name: "OrderStatusId",
                table: "Invoices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "OrderStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderStatuses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_OrderStatusId",
                table: "Invoices",
                column: "OrderStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invoices_OrderStatuses_OrderStatusId",
                table: "Invoices",
                column: "OrderStatusId",
                principalTable: "OrderStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invoices_OrderStatuses_OrderStatusId",
                table: "Invoices");

            migrationBuilder.DropTable(
                name: "OrderStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_OrderStatusId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "OrderStatusId",
                table: "Invoices");

            migrationBuilder.AddColumn<string>(
                name: "OrderStatus",
                table: "Invoices",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
