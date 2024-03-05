using _1PermilNetCoreSite.Models.TimeTracker;
using _1PermilNetCoreSite.Models.Articles;
using _1PermilNetCoreSite.Models.CustomIdentity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Identity;


namespace _1PermilNetCoreSite.Data
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, long>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			// Configure the new primary key column
			builder.Entity<ApplicationUser>()
				.Property(u => u.Id)
				.ValueGeneratedOnAdd();

			builder.Entity<ApplicationRole>()
				.Property(u => u.Id)
				.ValueGeneratedOnAdd();

            // If Client is deleted from Project, Client will be set to null
            builder.Entity<Project>()
				.HasOne(p => p.Client) 
				.WithMany(c => c.Projects) 
				.HasForeignKey(p => p.ClientId) 
				.OnDelete(DeleteBehavior.ClientSetNull); 

            // Defining complex primary key for TimeEntryTag
            builder.Entity<TimeEntryTag>()
				.HasKey(tet => new { tet.TimeEntryId, tet.TagId });

			// Defining relationships for TimeEntryTag
			builder.Entity<TimeEntryTag>()
				.HasOne(tet => tet.TimeEntry)
				.WithMany(te => te.TimeEntryTags)
				.HasForeignKey(tet => tet.TimeEntryId);

			builder.Entity<TimeEntryTag>()
				.HasOne(tet => tet.Tag)
				.WithMany(t => t.TimeEntryTags)
				.HasForeignKey(tet => tet.TagId);
		}

		// Time tracker tables
		public DbSet<Client>? Clients { get; set; }
		public DbSet<Project>? Projects { get; set; }
		public DbSet<TimeEntry>? TimeEntries { get; set; }

		// Articles tables
		public DbSet<Article>? Articles { get; set; }

		// Tag & TimeEntryTag
		public DbSet<Tag>? Tags { get; set; }
		public DbSet<TimeEntryTag>? TimeEntryTags { get; set; } 
	}
}