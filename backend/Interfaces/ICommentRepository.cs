using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Interfaces
{
    public interface ICommentRepository
    {
        Task<IActionResult> CreateComment(Comment comment);
        Task<IEnumerable<Comment>> GetComments(int productId);
        Task<Comment> GetComment(int id);
        Task<IActionResult> UpdateComment(int id, Comment comment);
        Task<IActionResult> DeleteComment(int id);
    }
}
