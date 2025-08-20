using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using Entities.Entities;

namespace Infraestructure.Configuration
{
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var context = new ContextBase(
                serviceProvider.GetRequiredService<DbContextOptions<ContextBase>>());
            
            var authService = serviceProvider.GetRequiredService<IAuthService>();

            // 👥 VERIFICAR E CRIAR USUÁRIOS
            if (!await context.Users.AnyAsync())
            {
                var users = new[]
                {
                    new User 
                    { 
                        Name = "Administrador", 
                        Username = "admin", 
                        Email = "admin@email.com",
                        PasswordHash = authService.HashPassword("123456"),
                        CreatedAt = DateTime.UtcNow
                    },
                    new User 
                    { 
                        Name = "Victor Souza", 
                        Username = "victor", 
                        Email = "victor@email.com",
                        PasswordHash = authService.HashPassword("senha123"),
                        CreatedAt = DateTime.UtcNow
                    }
                };

                await context.Users.AddRangeAsync(users);
                await context.SaveChangesAsync();
                Console.WriteLine("✅ Usuários seed criados com sucesso!");
            }

            // 📦 VERIFICAR E CRIAR PRODUTOS
            if (!await context.Products.AnyAsync())
            {
                var products = new[]
                {
                    new Product { Nome = "Notebook Dell XPS", Preco = 4500.00m, Descricao = "Notebook premium i7, 16GB RAM" },
                    new Product { Nome = "iPhone 15 Pro", Preco = 5999.00m, Descricao = "Smartphone Apple 256GB" },
                    new Product { Nome = "Samsung Odyssey G9", Preco = 3200.00m, Descricao = "Monitor gaming 49\" curved" },
                    new Product { Nome = "Teclado Mecânico", Preco = 450.00m, Descricao = "Teclado RGB switches blue" },
                    new Product { Nome = "Mouse Gamer", Preco = 250.00m, Descricao = "Mouse 16000DPI RGB" },
                    new Product { Nome = "Headset Wireless", Preco = 350.00m, Descricao = "Headset 7.1 surround sound" },
                    new Product { Nome = "Webcam 4K", Preco = 280.00m, Descricao = "Webcam com microfone integrado" },
                    new Product { Nome = "SSD 1TB NVMe", Preco = 420.00m, Descricao = "SSD alta velocidade leitura 3500MB/s" }
                };

                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
                Console.WriteLine("✅ Produtos seed criados com sucesso!");
            }
        }
    }
}