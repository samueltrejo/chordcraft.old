﻿using chordcraft.api.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace chordcraft.api.Repositories
{
    public class NoteRepository
    {
        string _connectionString = "Server=localhost;Database=ChordCraft;Trusted_Connection=True;";

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

        public bool DeleteNote(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "update [Note] set [IsDeleted] = 1 where [Id] = @id";
                var parameters = new { id };
                return db.Execute(sql, parameters) == 1;
            }
        }
    }
}
