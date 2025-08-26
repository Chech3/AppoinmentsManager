using AppoinmentsManager.Server.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace AppoinmentsManager.Server.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Appoinments> Appoinments { get; set; }

  
    }
}
