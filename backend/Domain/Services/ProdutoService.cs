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

        public async Task UpdateProdutoAsync(Produto produto)
        {
            await _produtoRepository.Update(produto);
        }

        public async Task DeleteProdutoAsync(Produto produto)
        {
            await _produtoRepository.Delete(produto);
        }

        public async Task<Produto> GetProdutoByIdAsync(int id)
        {
            return await _produtoRepository.GetEntityById(id);
        }

        public async Task<List<Produto>> GetAllProdutosAsync()
        {
            return await _produtoRepository.GetList();
        }

        public async Task<(List<Produto> itens, int total)> GetPagedList(int pageNumber, int pageSize, string searchTerm, string searchProperty, string orderByProperty, bool isAscending)
        {
            return await _produtoRepository.GetPagedList(pageNumber, pageSize, searchTerm, searchProperty, orderByProperty, isAscending);
        }

        public async Task<List<Produto>> BuscarPorNomeAsync(string nome)
        {
            return await _produtoRepository.BuscarPorNomeAsync(nome);
        }

    }
}
