using HealthData.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace HealthData.DBContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<TokenObject> TokenObjects { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TokenObject>(entity => 
            {
                entity.ToTable("TokenObject");
                entity.HasKey(x => x.ClientUserId);
            });
        }
    }
}
