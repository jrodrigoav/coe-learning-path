using LearningPath.API.Configurations;
using LearningPath.API.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
//Custom services
builder.Services.AddScoped<IAzureDevopsService, AzureDevopsService>();
builder.Services.AddAutoMapper(typeof(MapperInitializer));
//
var app = builder.Build();

app.MapControllers();
app.MapGet("/", () => "Learning Path API");

app.Run();
