using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using chordcraft.api.DataModels;
using chordcraft.api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace chordcraft.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LyricChordController : Controller
    {
        readonly LyricChordRepository _repo;

        public LyricChordController(LyricChordRepository repo)
        {
            _repo = repo;
        }

        // get lyricChord
        [HttpGet]
        public IEnumerable<LyricChord> GetLyricChords()
        {
            return _repo.GetLyricChords();
        }

        // get lyricChord/id
        [HttpGet("{id}")]
        public LyricChord GetLyricChord(int id)
        {
            return _repo.GetLyricChord(id);
        }

        // post lyricChord
        [HttpPost]
        public LyricChord PostLyricChord(LyricChord newLyricChord)
        {
            return _repo.PostLyricChord(newLyricChord);
        }

        // post lyricChord/id
        //[HttpPut("{id}")]
        //public LyricChord UpdateLyricChord(LyricChord updatedLyricChord, int id)
        //{
        //    updatedLyricChord.Id = id;
        //    return _repo.UpdateLyricChord(updatedLyricChord);
        //}

        // delete lyricChord/id
        [HttpDelete("{id}")]
        public bool DeleteLyricChord(int id)
        {
            return _repo.DeleteLyricChord(id);
        }
    }
}