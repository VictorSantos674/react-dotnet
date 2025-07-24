using Entities.Entities;

namespace Domain.Interfaces
{
    public interface IProdutoService
    {
        Task AddProdutoAsync(Produto produto);
        Task<List<Produto>> GetProdutosAsync();
    }
}
