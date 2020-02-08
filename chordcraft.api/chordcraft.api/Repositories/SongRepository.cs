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
        IConfiguration _configuration;

        public SongRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<Song> GetSongs()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Song] where [IsDeleted] = 0 and [IsPublic] = 1";
                var songs = db.Query<Song>(sql);
                return songs;
            }
        }

        public IEnumerable<Song> GetSongs(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Song] where [IsDeleted] = 0 and [OwnerId] = @id";
                var parameters = new { id };
                var songs = db.Query<Song>(sql, parameters);
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
                var sql = @"insert into [Song] ([Name], [Artist], [Genre], [Lyrics], [OwnerId], [IsPublic])
                            output inserted.* values (@Name, @Artist, @Genre, @Lyrics, @OwnerId, @IsPublic)";
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
                                [Lyrics] = @Lyrics,
	                            [Genre] = @Genre
                             output inserted.*
                             where Id = @Id";

                var song = db.QueryFirstOrDefault<Song>(sql, updatedSong);
                return song;
            }
        }
    }
}
