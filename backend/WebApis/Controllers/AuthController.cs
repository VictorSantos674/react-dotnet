using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using Entities.Entities;
using Entities.Dtos;
using Infraestructure.Configuration;

namespace WebApis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ContextBase _context;
        private readonly IAuthService _authService;

        public AuthController(IConfiguration configuration, ContextBase context, IAuthService authService)
        {
            _configuration = configuration;
            _context = context;
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Dados inválidos", errors = ModelState.Values.SelectMany(v => v.Errors) });
                }

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == loginDto.Username);

                if (user == null || !_authService.VerifyPassword(loginDto.Password, user.PasswordHash))
                {
                    return Unauthorized(new { message = "Usuário ou senha inválidos" });
                }

                var token = _authService.GenerateJwtToken(user);
                
                return Ok(new { 
                    token, 
                    user = new {
                        user.Id,
                        user.Name,
                        user.Username,
                        user.Email
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new { message = "Dados inválidos", errors = ModelState.Values.SelectMany(v => v.Errors) });
                }

                // Verificar se usuário já existe
                var userExists = await _context.Users
                    .AnyAsync(u => u.Username == registerDto.Username || u.Email == registerDto.Email);

                if (userExists)
                {
                    return BadRequest(new { message = "Usuário ou email já cadastrado" });
                }

                // Criar novo usuário
                var user = new User
                {
                    Name = registerDto.Name,
                    Email = registerDto.Email,
                    Username = registerDto.Username,
                    PasswordHash = _authService.HashPassword(registerDto.Password),
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var token = _authService.GenerateJwtToken(user);
                
                return Ok(new { 
                    token, 
                    user = new {
                        user.Id,
                        user.Name,
                        user.Username,
                        user.Email
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno do servidor", error = ex.Message });
            }
        }
    }
}