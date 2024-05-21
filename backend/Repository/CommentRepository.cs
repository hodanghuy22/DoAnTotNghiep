using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly CSDLContext _context;

        public CommentRepository(CSDLContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> CreateComment(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkObjectResult(new
                {
                    mess = "Successfully created!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<IActionResult> DeleteComment(int id)
        {
            var pt = await GetComment(id);

            if (pt == null)
            {
                return new NotFoundObjectResult(new
                {
                    mess = "Can't find this comment!"
                });
            }
            _context.Comments.Remove(pt);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return new OkObjectResult(new
                {
                    mess = "Successfully deleted!"
                });
            }
            return new BadRequestObjectResult(new
            {
                mess = "Something went wrong!!!"
            });
        }

        public async Task<Comment> GetComment(int id)
        {
            return await _context.Comments.Include(i => i.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Comment>> GetComments(int productId)
        {
            return await _context.Comments.Include(i => i.User)
                .Include(c => c.ChildComments)
                .Where(c => c.ProductId == productId && c.ParentComment == null)
                .ToListAsync();
        }

        public async Task<IActionResult> UpdateComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return new BadRequestObjectResult(new
                {
                    mess = "Something went wrong!!!"
                });
            }
            try
            {
                var pt = await GetComment(id);
                _context.Entry(pt).CurrentValues.SetValues(comment);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }

            return new OkObjectResult(new
            {
                mess = "Successfully updated!"
            });
        }
    }
}
