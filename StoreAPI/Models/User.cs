namespace StoreAPI.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public byte[] Password { get; set; }
        public byte[] PasswordSalt { get; set; }
        public byte[] PasswordHash { get; set; }
    }
}
