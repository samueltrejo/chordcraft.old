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
    public class SongRepository
    {
        string _connectionString;

        public SongRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<Song> GetSongs()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Song] where [IsDeleted] = 0";
                var songs = db.Query<Song>(sql);
                return songs;
            }
        }

        public Song GetSong(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Song] where [Id] = @id";
                var parameters = new { id };
                var song = db.QueryFirstOrDefault<Song>(sql, parameters);
                return song;
            }
        }

        public bool DeleteSong(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "update [Song] set [IsDeleted] = 1 where [Id] = @id";
                var parameters = new { id };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public Song PostSong(Song newSong)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"insert into [Song] ([Name], [Artist], [Genre], [OwnerId])
                            values (@Name, @Artist, @Genre, @OwnerId)
                            output inserted.*";
                var song = db.QueryFirstOrDefault<Song>(sql, newSong);
                return song;
            }
        }

        public Song UpdateSong(Song updatedSong)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"update [Song]
                            set [Name] = @Name,
	                            [Artist] = @Artist,
	                            [Name] = @Name,
	                            [Genre] = @Genre
                             output inserted.*
                             where Id = @Id";

                var song = db.QueryFirstOrDefault<Song>(sql, updatedSong);
                return song;
            }
        }
    }
}
