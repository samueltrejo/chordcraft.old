using chordcraft.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace chordcraft.api.Repositories
{
    public class ChordRepository
    {
        string _connectionString = "Server=localhost;Database=ChordCraft;Trusted_Connection=True;";

        public IEnumerable<Chord> GetChords()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Chord] where [IsDeleted] = 0";
                var chords = db.Query<Chord>(sql);
                return chords;
            }
        }

        public Chord GetChord(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Chord] where [Id] = @id";
                var parameters = new { id };
                var chord = db.QueryFirstOrDefault<Chord>(sql, parameters);
                return chord;
            }
        }

        public bool DeleteChord(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "update [Chord] set [IsDeleted] = 1 where [Id] = @id";
                var parameters = new { id };
                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}
