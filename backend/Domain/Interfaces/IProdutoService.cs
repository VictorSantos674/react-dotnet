using Entities.Entities;

namespace Domain.Interfaces
{
    public interface IProdutoService
    {
        Task AddProdutoAsync(Produto produto);
        Task UpdateProdutoAsync(Produto produto);
        Task DeleteProdutoAsync(Produto produto);
        Task<Produto> GetProdutoByIdAsync(int id);
        Task<List<Produto>> GetAllProdutosAsync();
        Task<(List<Produto> itens, int total)> GetPagedList(
            int pageNumber,
            int pageSize,
            string searchTerm,
            string searchProperty,
            string orderByProperty,
            bool isAscending
        );
        Task<List<Produto>> BuscarPorNomeAsync(string nome);        
    }
}
