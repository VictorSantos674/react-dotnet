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

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Produto produto)
        {
            await _produtoService.AddProdutoAsync(produto);
            return CreatedAtAction(nameof(Get), new { id = produto.Id }, produto);
        }
    }
}
