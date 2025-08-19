using System.ComponentModel.DataAnnotations;

namespace Entities.Dtos
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Username é obrigatório")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password é obrigatório")]
        public string Password { get; set; } = string.Empty;
    }
}