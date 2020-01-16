using chordcraft.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace chordcraft.api.Repositories
{
    public class SongRepository
    {
        string _connectionString = "Server=localhost;Database=ChordCraft;Trusted_Connection=True;";

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
    }
}
