using HealthData.DBContext;
using HealthData.Models;
using HealthData.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RestSharp;

namespace HealthData.Controllers
{
    [ApiController]
    [Route("auth")]
    public class HAPIAuthenticationController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IOptions<HAPI> _hapiOptions;

        public HAPIAuthenticationController(ApplicationDbContext context, IOptions<HAPI> hapiOptions)
        {
            _context = context;
            _hapiOptions = hapiOptions;
        }

        [HttpPost("session/connect/register")]
        public async Task<IActionResult> CreateUserSession(SessionTokenObject tokenObject)
        {
            if (ModelState.IsValid)
            {
                var token = await GetPublicToken(tokenObject);
                tokenObject.AccessToken = token.AccessToken;
                tokenObject.PublicToken= token.PublicToken;
                using (_context)
                {
                    _context.TokenObjects.Add(tokenObject);
                    await _context.SaveChangesAsync();
                }
                return Ok();
            }
            else
            {
                return BadRequest("Model is invalid");
            }
        }

        [HttpGet("session/connect/registration/{userIdentifier}")]
        public async Task<IActionResult> GetUserSession(string userIdentifier)
        {
            if (userIdentifier == null)
            {
                return BadRequest("No Data");
            }

            var registration = await _context.TokenObjects
                .FirstOrDefaultAsync(x => x.ClientUserId.Trim().ToLower() == userIdentifier.Trim().ToLower());

            return Ok(registration);
        }

        [HttpPost("session/token")]
        public async Task<IActionResult> GetToken(SessionTokenObject tokenObject)
        {
            var settings = _hapiOptions.Value;

            if (ModelState.IsValid)
            {
                var options = new RestClientOptions("https://user.humanapi.co/v1/connect/tokens");
                var client = new RestClient(options);
                var request = new RestRequest("");
                request.AddHeader("accept", "application/json");
                request.AddBody(new
                {
                    clientid = settings.ClientId,
                    humanId = tokenObject.HumanId,
                    sessionToken = tokenObject.sessionToken,
                    clientSecret = settings.ClientSecret
                });
                var response = await client.PostAsync(request);
                return Ok();
            }
            else
            {
                return BadRequest("Token Object not valid");
            }
        }

        private async Task<PublicTokenObject> GetPublicToken(SessionTokenObject tokenObject)
        {
            var settings = _hapiOptions.Value;

            var options = new RestClientOptions("https://user.humanapi.co/v1/connect/tokens");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");

            request.AddJsonBody<dynamic>(new
            {
                humanId = tokenObject.HumanId,
                clientId = settings.ClientId,
                clientSecret = settings.ClientSecret,
                sessionToken = tokenObject.sessionToken
            });

            try
            {
                var response = await client.PostAsync<PublicTokenObject>(request);
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return null;
        }
    }
}
