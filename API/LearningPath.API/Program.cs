using LearningPath.API.Configurations;
using LearningPath.API.Models;
using LearningPath.API.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
//Custom services
builder.Services.Configure<AzureDevOpsSettings>(builder.Configuration.GetSection(nameof(AzureDevOpsSettings)));
builder.Services.AddScoped<AzureDevopsService>();
builder.Services.AddAutoMapper(typeof(MapperInitializer));
//
var app = builder.Build();
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

app.MapControllers();
app.MapGet("/", () => "Learning Path API");

app.Run();
