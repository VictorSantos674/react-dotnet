using Entities.Entities;

namespace Domain.Interfaces
{
    public interface IProdutoRepository
    {
        Task Add(Produto entity);
        Task Update(Produto entity);
        Task Delete(Produto entity);
        Task<Produto> GetEntityById(int id);
        Task<List<Produto>> GetList();
        Task<(List<Produto> itens, int total)> GetPagedList(int pageNumber, int pageSize, string searchTerm, string searchProperty, string orderByProperty, bool isAscending);
    }
}
