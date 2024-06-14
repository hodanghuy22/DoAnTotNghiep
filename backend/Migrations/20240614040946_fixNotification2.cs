using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class fixNotification2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "IsRead",
                table: "Notifications",
                newName: "IsAdminAccess");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsAdminAccess",
                table: "Notifications",
                newName: "IsRead");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Notifications",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
