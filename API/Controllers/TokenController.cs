#nullable disable
using API.Dtos;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly APIContext _context;
        private readonly ITokenService _tokenService;

        public TokenController(APIContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> Refresh(TokenApiModelDto tokenApiModelDto)
        {
            if (tokenApiModelDto is null)
                return BadRequest("Invalid client request");

            string accessToken = tokenApiModelDto.AccessToken;
            string refreshToken = tokenApiModelDto.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name; //this is mapped to the Name claim by default

            var user = await _context.LoginModels.SingleOrDefaultAsync(u => u.UserName == username);

            if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Invalid client request");

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            await _context.SaveChangesAsync();

            return Ok(new AuthenticatedResponseDto()
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }
        [HttpPost, Authorize]
        [Route("revoke")]
        public async Task<IActionResult> Revoke()
        {
            var username = User.Identity.Name;

            var user = await _context.LoginModels.SingleOrDefaultAsync(u => u.UserName == username);
            if (user == null) return BadRequest();

            user.RefreshToken = null;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}