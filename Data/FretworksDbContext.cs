using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Fretworks.Models;
using Microsoft.AspNetCore.Identity;

namespace Fretworks.Data;
public class FretworksDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;


    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<RepairTicketService> RepairTicketServices { get; set; }
    public DbSet<RepairTicket> RepairTickets { get; set; }

    public FretworksDbContext(DbContextOptions<FretworksDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //=================================================================================

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "d6c7e8e9-f0f1-g2h3-i4j5-k6l7m8n9o0p1",
            Name = "Customer",
            NormalizedName = "customer"
        });

        //=================================================================================

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "3f14afbc-d3e9-4f36-b6d2-9f490b6e4b12",
            UserName = "RyanJones",
            Email = "ryanjones@email.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["CustomerPassword"])
        });

        //=================================================================================

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "d6c7e8e9-f0f1-g2h3-i4j5-k6l7m8n9o0p1",
            UserId = "3f14afbc-d3e9-4f36-b6d2-9f490b6e4b12"
        });

        //=================================================================================

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
            IsEmployee = true
        });

        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 2,
            IdentityUserId = "3f14afbc-d3e9-4f36-b6d2-9f490b6e4b12",
            FirstName = "Ryan",
            LastName = "Jones",
            Address = "102 Main Street",
            IsEmployee = false
        });

        //=================================================================================

        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service { Id = 1, ServiceName = "Re-stringing", Cost = 20.00m },
            new Service { Id = 2, ServiceName = "Fret level", Cost = 50.00m },
            new Service { Id = 3, ServiceName = "Truss rod adjustment", Cost = 30.00m },
            new Service { Id = 4, ServiceName = "Nut replacement", Cost = 40.00m },
            new Service { Id = 5, ServiceName = "Bridge adjustment", Cost = 25.00m },
            new Service { Id = 6, ServiceName = "Electronics repair", Cost = 60.00m },
            new Service { Id = 7, ServiceName = "Fretboard cleaning", Cost = 15.00m },
            new Service { Id = 8, ServiceName = "Intonation setup", Cost = 35.00m },
            new Service { Id = 9, ServiceName = "Neck reset", Cost = 80.00m },
            new Service { Id = 10, ServiceName = "Polishing", Cost = 20.00m },
            new Service { Id = 11, ServiceName = "Pickup replacement", Cost = 70.00m },
            new Service { Id = 12, ServiceName = "Action adjustment", Cost = 30.00m },
            new Service { Id = 13, ServiceName = "Tuning machine installation", Cost = 45.00m },
            new Service { Id = 14, ServiceName = "Refretting", Cost = 90.00m },
            new Service { Id = 15, ServiceName = "Nut filing", Cost = 25.00m },
            new Service { Id = 16, ServiceName = "Finish repair", Cost = 55.00m },
            new Service { Id = 17, ServiceName = "Setup & Maintenance", Cost = 100.00m },
            new Service { Id = 18, ServiceName = "Neck replacement", Cost = 120.00m },
            new Service { Id = 19, ServiceName = "Strap button installation", Cost = 10.00m },
            new Service { Id = 20, ServiceName = "Custom setup", Cost = 150.00m }
        });

        modelBuilder.Entity<RepairTicket>().HasData(new RepairTicket[]
        {
           new RepairTicket
        {
            Id = 1,
            CustomerName = "Ryan Jones",
            Email = "ryanjones@email.com",
            PhoneNumber = "615-555-5555",
            Instrument = "Fender Telecaster",
            DropOffDate = DateTime.Now,
            PickupDate = null,
            Message = "Intonation Issues",
            IsRushed = false,
            IsCompleted = false,
            CustomerId = 2,
            EmployeeId = 1
        },
            new RepairTicket
        {
            Id = 2,
            CustomerName = "Ryan Jones",
            Email = "ryanjones@email.com",
            PhoneNumber = "615-555-5555",
            Instrument = "Fender Stratocaster",
            DropOffDate = DateTime.Now,
            PickupDate = null,
            Message = "Tuning Issues",
            IsRushed = true,
            IsCompleted = false,
            CustomerId = 2,
            EmployeeId = 1
         },
         new RepairTicket
         {
            Id = 3,
            CustomerName = "Ryan Jones",
            Email = "ryanjones@email.com",
            PhoneNumber = "615-555-5555",
            Instrument = "Gibson Les Paul",
            DropOffDate = DateTime.Now,
            PickupDate = null,
            Message = "Breaking Strings",
            IsRushed = false,
            IsCompleted = false,
            CustomerId = 2,
            EmployeeId = null
         },
             new RepairTicket
         {
            Id = 4,
            CustomerName = "Ryan Jones",
            Email = "ryanjones@email.com",
            PhoneNumber = "615-555-5555",
            Instrument = "Gibson ES 335",
            DropOffDate = DateTime.Now,
            PickupDate = null,
            Message = "scratchy volume pot",
            IsRushed = false,
            IsCompleted = false,
            CustomerId = 2,
            EmployeeId = null
         }

        });

        modelBuilder.Entity<RepairTicketService>().HasData(new RepairTicketService[]
        {
            new RepairTicketService
            {
                Id = 1,
                RepairTicketId = 1,
                ServiceId = 1
            },
              new RepairTicketService
            {
                Id = 2,
                RepairTicketId = 1,
                ServiceId = 2
            },
              new RepairTicketService
            {
                Id = 3,
                RepairTicketId = 1,
                ServiceId = 3
            },
              new RepairTicketService
            {
                Id = 4,
                RepairTicketId = 2,
                ServiceId = 4
            },
              new RepairTicketService
            {
                Id = 5,
                RepairTicketId = 2,
                ServiceId = 5
            },
              new RepairTicketService
            {
                Id = 6,
                RepairTicketId = 2,
                ServiceId = 6
            },
                new RepairTicketService
            {
                Id = 7,
                RepairTicketId = 3,
                ServiceId = 5
            },
                new RepairTicketService
            {
                Id = 8,
                RepairTicketId = 3,
                ServiceId = 7
            },
                new RepairTicketService
            {
                Id = 9,
                RepairTicketId = 4,
                ServiceId = 8
            },
                new RepairTicketService
            {
                Id = 10,
                RepairTicketId = 4,
                ServiceId = 2
            },
        });

    }
}