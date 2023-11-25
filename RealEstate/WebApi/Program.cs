using DAL;
using DAL.Repositories;
using Domain.Models;
using Domain.Repositories;
using Domain.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Domain.MapperProfiles;
using System.Runtime.Serialization;
using Quartz;
using WebApi.Jobs;
using System.Reflection;
using System.Runtime.CompilerServices;

var builder = WebApplication.CreateBuilder(args);

var frontendPolicy = "frontend";
builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendPolicy,
        builder =>
        {
            builder.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        }
    );
});

builder.Services.AddSignalR();
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT authorization header",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement() {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer",
                },
                Scheme = "Oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

builder.Configuration.AddEnvironmentVariables();

// Repositories
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<RealEstateDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddScoped<IAdRepository, AdRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();

builder.Services.AddScoped<AdService, AdService>();
builder.Services.AddScoped<UserService, UserService>();
builder.Services.AddScoped<MessageService, MessageService>();
builder.Services.AddScoped<AuthorizationService, AuthorizationService>();
builder.Services.AddScoped<SubscriptionService, SubscriptionService>();

builder.Services.AddIdentity<User, IdentityRole>(options => options.User.RequireUniqueEmail = true)
    .AddEntityFrameworkStores<RealEstateDbContext>()
    .AddDefaultTokenProviders();
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(option =>
    {
        option.SaveToken = true;
        option.RequireHttpsMetadata = true;
        option.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidAudience = builder.Configuration["JWT:ValidAudience"],
            ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
        };
    });
builder.Services.AddProblemDetails();
builder.Services.AddAutoMapper(
    typeof(UserProfile),
    typeof(AdProfile),
    typeof(SubscriptionProfile)
);

builder.Services.AddQuartz(q =>
{
    JobKey jobKey = new JobKey(nameof(CheckSubscriptionsJob));
    q.AddJob<CheckSubscriptionsJob>(opts => opts.WithIdentity(jobKey));

    q.AddTrigger(opts => opts
        .ForJob(jobKey)
        // Run job on startup
        .StartNow());
    q.AddTrigger(opts => opts
        .ForJob(jobKey)
        .WithIdentity($"{nameof(CheckSubscriptionsJob)}-trigger")
        // Run job every day
        .WithCronSchedule("0 0 0 ? * *")
    );
});
builder.Services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);

var app = builder.Build();

app.UseCors(frontendPolicy);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    using var scope = app.Services.CreateScope();
    using RealEstateDbContext context = scope.ServiceProvider.GetRequiredService<RealEstateDbContext>();

    if (context.Database.GetPendingMigrations().Count() > 0)
    {
        context.Database.EnsureDeleted();
        context.Database.Migrate();
        var assembly = Assembly.GetExecutingAssembly();
        string resourceName = assembly.GetManifestResourceNames().Single();
        using Stream? stream = assembly.GetManifestResourceStream(resourceName);
        if (stream == null)
            return;
        using StreamReader streamReader = new StreamReader(stream);
        context.Database.ExecuteSql(FormattableStringFactory.Create(streamReader.ReadToEnd()));
        context.SaveChanges();
    }
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHub<MessageHub>("chathub");

app.Run();