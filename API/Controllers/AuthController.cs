#nullable disable
using System.Security.Claims;
using API.Dtos;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly APIContext _context;
        private readonly ITokenService _tokenService;

        public AuthController(APIContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost, Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModelDto loginModelDto)
        {
            if (loginModelDto is null)
            {
                return BadRequest("Invalid client request");
            }

            var user = await _context.LoginModels.SingleOrDefaultAsync(u =>
                (u.UserName == loginModelDto.UserName) && (u.Password == loginModelDto.Password));
            if (user is null)
                return Unauthorized();

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, loginModelDto.UserName),
                new Claim(ClaimTypes.Role, "Manager")
            };
            var accessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddMinutes(15);

            await _context.SaveChangesAsync();

            return Ok(new AuthenticatedResponseDto
            {
                Token = accessToken,
                RefreshToken = refreshToken
            });
        }
    }
}