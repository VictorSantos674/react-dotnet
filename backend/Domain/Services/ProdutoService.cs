using Domain.Interfaces;
using Entities.Entities;

namespace Domain.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;

        public ProdutoService(IProdutoRepository produtoRepository)
        {
            _produtoRepository = produtoRepository;
        }

        public async Task AddProdutoAsync(Produto produto)
        {
            await _produtoRepository.Add(produto);
        }

        public async Task<List<Produto>> GetProdutosAsync()
        {
            return await _produtoRepository.GetAll();
        }
    }
}
