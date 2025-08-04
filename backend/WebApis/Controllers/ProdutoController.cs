using Domain.Interfaces;
using Entities.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;

        public ProdutoController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Produto>>> Get()
        {
            var produtos = await _produtoService.GetProdutosAsync();
            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetProdutoById(int id)
        {
            var produto = await _produtoService.GetProdutoByIdAsync(id);
            if (produto == null)
                return NotFound();

            return Ok(produto);
        }

        [HttpGet("ListarTodos")]
        public async Task<ActionResult<List<Produto>>> GetAllProdutos()
        {
            var produtos = await _produtoService.GetAllProdutosAsync();
            return Ok(produtos);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Produto produto)
        {
            await _produtoService.AddProdutoAsync(produto);
            return CreatedAtAction(nameof(Get), new { id = produto.Id }, produto);
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduto(int id, [FromBody] Produto produto)
        {
            if (id != produto.Id)
            {
                return BadRequest("ID na URL não corresponde ao ID do produto.");
            }

            await _produtoService.UpdateProdutoAsync(produto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduto(int id)
        {
            var produto = await _produtoService.GetProdutoByIdAsync(id);
            if (produto == null)
            {
                return NotFound("Produto não encontrado.");
            }

            await _produtoService.DeleteProdutoAsync(produto);
            return NoContent();
        }

        [HttpGet("BuscarPorNome")]
        public async Task<ActionResult<List<Produto>>> BuscarPorNome(string nome)
        {
            var produtos = await _produtoService.BuscarPorNomeAsync(nome);
            return Ok(produtos);
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? searchTerm = null)
        {
            var (items, totalCount) = await _produtoService.GetPagedProductsAsync(pageNumber, pageSize, searchTerm);
            return Ok(new
            {
                products = items,
                total = totalCount,
                pageNumber,
                pageSize
            });
        }
    }
}
