using chordcraft.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace chordcraft.api.Repositories
{
    public class LyricRepository
    {
        string _connectionString = "Server=localhost;Database=ChordCraft;Trusted_Connection=True;";

        public IEnumerable<Lyric> GetLyrics()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Lyric] where [IsDeleted] = 0";
                var lyrics = db.Query<Lyric>(sql);
                return lyrics;
            }
        }

        public Lyric GetLyric(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Lyric] where [Id] = @id";
                var parameters = new { id };
                var lyric = db.QueryFirstOrDefault<Lyric>(sql, parameters);
                return lyric;
            }
        }

        public bool DeleteLyric(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "update [Lyric] set [IsDeleted] = 1 where [Id] = @id";
                var parameters = new { id };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public Lyric PostLyric(Lyric newLyric)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"insert into [Lyric] ([Verse], [SongId])
                            values (@Verse, @SongId)
                            output inserted.*";
                var lyric = db.QueryFirstOrDefault<Lyric>(sql, newLyric);
                return lyric;
            }
        }

        public Lyric UpdateLyric(Lyric updatedLyric)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"update [Lyric]
                            set [Verse] = @Verse
                             output inserted.*
                             where Id = @Id";

                var lyric = db.QueryFirstOrDefault<Lyric>(sql, updatedLyric);
                return lyric;
            }
        }
    }
}
