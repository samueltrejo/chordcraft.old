using chordcraft.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace chordcraft.api.Repositories
{
    public class ChordNoteRepository
    {
        string _connectionString = "Server=localhost;Database=ChordCraft;Trusted_Connection=True;";

        public IEnumerable<ChordNote> GetChordNotes()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [ChordNote] where [IsDeleted] = 0";
                var chordNote = db.Query<ChordNote>(sql);
                return chordNote;
            }
        }

        public ChordNote GetChordNote(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [ChordNote] where [Id] = @id";
                var parameters = new { id };
                var chordNote = db.QueryFirstOrDefault<ChordNote>(sql, parameters);
                return chordNote;
            }
        }

        public bool DeleteChordNote(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "update [ChordNote] set [IsDeleted] = 1 where [Id] = @id";
                var parameters = new { id };
                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}
