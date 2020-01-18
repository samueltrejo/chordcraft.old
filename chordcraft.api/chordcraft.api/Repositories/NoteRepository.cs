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
    public class NoteRepository
    {
        string _connectionString;

        public NoteRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<Note> GetNotes()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Note] where [IsDeleted] = 0";
                var notes = db.Query<Note>(sql);
                return notes;
            }
        }

        public Note GetNote(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Note] where [Id] = @id";
                var parameters = new { id };
                var note = db.QueryFirstOrDefault<Note>(sql, parameters);
                return note;
            }
        }

        // Note does not have Create, Update, or Delete
    }
}
