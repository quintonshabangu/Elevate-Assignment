using HealthData.DBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthData.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context) 
        {
            _context= context;
        }

        // TODO User AzureAD Integration
        [HttpGet("me/{userIdentifier}")]
        public async Task<IActionResult> GetUser(string userIdentifier)
        {
            if (string.IsNullOrWhiteSpace(userIdentifier))
            {
                return BadRequest("User Identifier is required");
            }

            var user = await _context.TokenObjects
                .FirstOrDefaultAsync(x => x.ClientUserId.ToLower() == userIdentifier.ToLower());

            return Ok(user);
        }
    }
}
