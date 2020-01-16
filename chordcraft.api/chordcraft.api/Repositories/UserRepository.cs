using chordcraft.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace chordcraft.api.Repositories
{
    public class UserRepository
    {
        string _connectionString = "Server=localhost;Database=ChordCraft;Trusted_Connection=True;";

        public IEnumerable<User> GetUsers()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [User] where [IsDeleted] = 0";
                var users = db.Query<User>(sql);
                return users;
            }
        }

        public User GetUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [User] where [Id] = @id";
                var parameters = new { id };
                var user = db.QueryFirstOrDefault<User>(sql, parameters);
                return user;
            }
        }

        public bool DeleteUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "update [User] set [IsDeleted] = 1 where [Id] = @id";
                var parameters = new { id };
                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}
