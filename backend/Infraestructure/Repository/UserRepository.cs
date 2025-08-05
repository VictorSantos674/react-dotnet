using Entities.Entities;

namespace Infraestructure.Repository
{
    public static class UserRepository
    {
        private static List<User> users = new()
        {
            new User { Id = 1, Username = "admin", Password = "123456" },
            new User { Id = 2, Username = "victor", Password = "senha123" }
        };

        public static User? GetUser(string username, string password)
        {
            return users.FirstOrDefault(u => u.Username == username && u.Password == password);
        }
    }
}
