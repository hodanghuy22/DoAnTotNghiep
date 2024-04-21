using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public CommentsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet("GetComments/{prodId}")]
        public async Task<IActionResult> GetComments(int prodId)
        {
            var comments = await _uow.CommentRepository.GetComments(prodId);
            return Ok(comments);
        }
        [HttpGet]
        [Route("GetComment/{id}")]
        public async Task<IActionResult> GetComment(int id)
        {
            var comment = await _uow.CommentRepository.GetComment(id);
            return Ok(comment);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateComment(Comment comment)
        {
            return await _uow.CommentRepository.CreateComment(comment);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateComment(int id, Comment comment)
        {
            return await _uow.CommentRepository.UpdateComment(id,comment);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(int id)
        {
            return await _uow.CommentRepository.DeleteComment(id);
        }
    }
}
