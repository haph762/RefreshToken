using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<LoginModel>? LoginModels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LoginModel>().HasData(new LoginModel
            {
                Id = 1,
                UserName = "UserTest1",
                Password = "UserTest1"
            });
        }
    }
}