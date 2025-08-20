using Microsoft.EntityFrameworkCore;
using Entities.Entities;

namespace Infraestructure.Configuration
{
    public class ContextBase : DbContext
    {
        public ContextBase(DbContextOptions<ContextBase> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurações do User
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Name).IsRequired().HasMaxLength(100);
                entity.Property(u => u.Username).IsRequired().HasMaxLength(50);
                entity.Property(u => u.Email).IsRequired().HasMaxLength(100);
                entity.Property(u => u.PasswordHash).IsRequired();
                entity.Property(u => u.CreatedAt).IsRequired();
            });

            // Configurações do Product
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Produtos");
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Nome).IsRequired().HasMaxLength(100).HasColumnName("nome");
                entity.Property(p => p.Preco).IsRequired().HasColumnType("decimal(18,2)");
                entity.Property(p => p.Descricao).IsRequired().HasMaxLength(500);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}