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
    public class ChordNoteController : Controller
    {
        readonly ChordNoteRepository _repo;

        public ChordNoteController(ChordNoteRepository repo)
        {
            _repo = repo;
        }

        // get chordNote
        [HttpGet]
        public IEnumerable<ChordNote> GetChordNotes()
        {
            return _repo.GetChordNotes();
        }

        // get chordNote/id
        [HttpGet("{id}")]
        public ChordNote GetChordNote(int id)
        {
            return _repo.GetChordNote(id);
        }

        // post chordNote
        [HttpPost]
        public ChordNote PostChordNote(ChordNote newChordNote)
        {
            return _repo.PostChordNote(newChordNote);
        }

        // post chordNote/id
        //[HttpPut("{id}")]
        //public ChordNote UpdateChordNote(ChordNote updatedChordNote, int id)
        //{
        //    updatedChordNote.Id = id;
        //    return _repo.UpdateChordNote(updatedChordNote);
        //}

        // delete chordNote/id
        [HttpDelete("{id}")]
        public bool DeleteChordNote(int id)
        {
            return _repo.DeleteChordNote(id);
        }
    }
}