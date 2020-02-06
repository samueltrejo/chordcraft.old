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
    public class ChordRepository
    {
        string _connectionString;
        IConfiguration _configuration;

        public ChordRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = configuration.GetValue<string>("ConnectionString");
        }

        public IEnumerable<Chord> GetChords()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Chord] where [IsDeleted] = 0";
                var chords = db.Query<Chord>(sql);
                return chords;
            }
        }

        public IEnumerable<Chord> GetSongChords(int songId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Chord] where [SongId] = @songId and [IsDeleted] = 0";
                var parameters = new { songId };
                var chords = db.Query<Chord>(sql, parameters);
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

        public Chord GetChord(string name)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = "select * from [Chord] where [Name] = @name";
                var parameters = new { name };
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

        public Chord PostChord(Chord newChord)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sql = @"insert into [Chord] ([Name], [Root], [Quality], [SongId], [Note1], [Note2], [Note3])
                            output inserted.* values (@Name, @Root, @Quality, @SongId, @Note1, @Note2, @Note3)";
                var chord = db.QueryFirstOrDefault<Chord>(sql, newChord);
                return chord;
            }
        }

        //public Chord UpdateChord(Chord updatedChord)
        //{
        //    using (var db = new SqlConnection(_connectionString))
        //    {
        //        var sql = @"update [Chord]
        //                    set [Name] = @Name,
        //                        [Root] = @Root,
        //                        [Quality] = @Quality,
        //                        [SongId] = @SongId,
        //                        [Note1] = @Note1,
        //                        [Note2] = @Note2,
        //                        [Note3] = @Note3,
        //                     output inserted.*
        //                     where Id = @Id";

        //        var chord = db.QueryFirstOrDefault<Chord>(sql, updatedChord);
        //        return chord;
        //    }
        //}
    }
}
