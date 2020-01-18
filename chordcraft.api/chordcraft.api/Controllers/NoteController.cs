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
    public class NoteController : Controller
    {
        readonly NoteRepository _repo;

        public NoteController(NoteRepository repo)
        {
            _repo = repo;
        }

        // get note
        [HttpGet]
        public IEnumerable<Note> GetNotes()
        {
            return _repo.GetNotes();
        }

        // get note/id
        [HttpGet("{id}")]
        public Note GetNote(int id)
        {
            return _repo.GetNote(id);
        }
    }
}