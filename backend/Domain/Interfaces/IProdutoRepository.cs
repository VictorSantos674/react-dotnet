using Entities.Entities;

namespace Domain.Interfaces
{
    public interface IProdutoRepository
    {
        Task Add(Produto produto);
        Task<List<Produto>> GetAll();
    }
}
