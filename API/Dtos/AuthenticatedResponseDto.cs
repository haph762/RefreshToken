namespace API.Dtos
{
    public class AuthenticatedResponseDto
    {
        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
    }
}