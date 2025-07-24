using Domain.Interfaces;
using Entities.Entities;
using Infraestructure.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Infraestructure.Repository
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly ContextBase _context;

        public ProdutoRepository(ContextBase context)
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
    }
}
