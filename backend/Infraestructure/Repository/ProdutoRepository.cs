using Domain.Interfaces;
using Entities.Entities;
using Infraestructure.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Infraestructure.Repository
{
    public class ProdutoRepository : IProdutoRepository, RepositoryGenerics<Produto>
    {
        private readonly ContextBase _context;

        public ProdutoRepository(ContextBase context) : base()
        {
            _context = context;
        }

        public async Task Add(Produto produto)
        {
            await _context.Set<Produto>().AddAsync(produto);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Produto>> GetAll()
        {
            return await _context.Set<Produto>().ToListAsync();
        }

        public async Task<List<Produto>> BuscarPorNomeAsync(string nome)
        {
            return await _context.Produto
                .Where(p => p.Nome.Contains(nome))
                .ToListAsync();
        }

        public async Task<(List<Product> Items, int TotalCount)> GetPagedProductsAsync(int pageNumber, int pageSize, string? searchTerm)
        {
            var query = _context.Product.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(p => p.Nome.Contains(searchTerm));
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderBy(p => p.Nome)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }
    }
}
