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
    public class ChordNoteRepository
    {
        string _connectionString;

        public ChordNoteRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

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

        public ChordNote PostChordNote(ChordNote newChordNote)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"insert into [ChordNote] ([ChordId], [NoteId])
                            output inserted.* values (@ChordId, @NoteId)";
                var chordNote = db.QueryFirstOrDefault<ChordNote>(sql, newChordNote);
                return chordNote;
            }
        }

        //public ChordNote UpdateChordNote(ChordNote updatedChordNote)
        //{
        //    using (var db = new SqlConnection(_connectionString))
        //    {
        //        var sql = @"update [ChordNote]
        //                    set [ChordId] = @ChordId,
	       //                     [NoteId] = @NoteId
        //                     output inserted.*
        //                     where Id = @Id";

        //        var chordNote = db.QueryFirstOrDefault<ChordNote>(sql, updatedChordNote);
        //        return chordNote;
        //    }
        //}
    }
}
