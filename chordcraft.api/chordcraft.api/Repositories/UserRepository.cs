using chordcraft.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace chordcraft.api.Repositories
{
    public class UserRepository
    {
        string _connectionString;

        public UserRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

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

        public User PostUser(User newUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"insert into [User] ([FirebaseUid], [Username], [Email], [], [Country], [Avatar], [Bio])
                            values (@FirebaseUid, @Username, @Email, @Name, @Country, @Avatar, @Bio)
                            output inserted.*";
                var user = db.QueryFirstOrDefault<User>(sql, newUser);
                return user;
            }
        }

        public User UpdateUser(User updatedUser)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"update [User]
                            set [Username] = @Username,
	                            [Email] = @Email,
	                            [Name] = @Name,
	                            [Country] = @Country,
	                            [Avatar] = @Avatar,
	                            [Bio] = @Bio
                             output inserted.*
                             where Id = @Id";

                var user = db.QueryFirstOrDefault<User>(sql, updatedUser);
                return user;
            }
        }
    }
}
