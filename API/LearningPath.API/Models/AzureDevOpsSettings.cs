namespace LearningPath.API.Models
{
    public record AzureDevOpsSettings
    {
        public string PersonalAccessToken { get; set; } = null!;
        public Uri AzureDevOpsProjectUri { get; set; } = null!;
    }
}
