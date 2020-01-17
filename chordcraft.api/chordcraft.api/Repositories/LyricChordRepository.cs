using chordcraft.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace chordcraft.api.Repositories
{
    public class LyricChordRepository
    {
        string _connectionString = "Server=localhost;Database=ChordCraft;Trusted_Connection=True;";

        public IEnumerable<LyricChord> GetLyricChords()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [LyricChord] where [IsDeleted] = 0";
                var lyricChords = db.Query<LyricChord>(sql);
                return lyricChords;
            }
        }

        public LyricChord GetLyricChord(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [LyricChord] where [Id] = @id";
                var parameters = new { id };
                var lyricChord = db.QueryFirstOrDefault<LyricChord>(sql, parameters);
                return lyricChord;
            }
        }

        public bool DeleteLyricChord(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "update [LyricChord] set [IsDeleted] = 1 where [Id] = @id";
                var parameters = new { id };
                return db.Execute(sql, parameters) == 1;
            }
        }

        public LyricChord PostLyricChord(LyricChord newLyricChord)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"insert into [LyricChord] ([Indentation], [LyricId], [ChordId])
                            values (@Indentation, @LyricId, @ChordId)
                            output inserted.*";
                var lyricChord = db.QueryFirstOrDefault<LyricChord>(sql, newLyricChord);
                return lyricChord;
            }
        }

        //public LyricChord UpdateLyricChord(LyricChord updatedLyricChord)
        //{
        //    using (var db = new SqlConnection(_connectionString))
        //    {
        //        var sql = @"update [LyricChord]
        //                    set [LyricChordname] = @LyricChordname,
	       //                     [Email] = @Email,
	       //                     [Name] = @Name,
	       //                     [Country] = @Country,
	       //                     [Avatar] = @Avatar,
	       //                     [Bio] = @Bio
        //                     output inserted.*
        //                     where Id = @Id";

        //        var lyricChord = db.QueryFirstOrDefault<LyricChord>(sql, updatedLyricChord);
        //        return lyricChord;
        //    }
        //}
    }
}
