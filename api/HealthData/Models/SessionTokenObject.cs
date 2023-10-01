namespace HealthData.Models
{
    public class TokenObject
    {
        public string ClientUserId { get; set; } = "";

        public string ClientId { get; set; } = "";

        public string HumanId { get; set; } = "";
        public string UserId { get; set; } = "";

        public string? PublicToken { get; set; }
        public string? AccessToken { get; set; }

    }

    public class BackendSessionTokenObject : TokenObject
    {
        public string clientSecret { get; set; } = "";
    }

    public class SessionTokenObject : TokenObject
    {
        public string sessionToken { get; set; } = "";

    }

    public class PublicTokenObject : TokenObject
    {
        public string PublicToken { get; set; } = "";
        public string AccessToken { get; set; } = "";
    }
}
