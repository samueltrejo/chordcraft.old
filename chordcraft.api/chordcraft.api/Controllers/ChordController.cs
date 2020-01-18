﻿using System;
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
    public class ChordController : Controller
    {
        readonly ChordRepository _repo;

        public ChordController(ChordRepository repo)
        {
            _repo = repo;
        }

        // get chord
        [HttpGet]
        public IEnumerable<Chord> GetChords()
        {
            return _repo.GetChords();
        }

        // get chord/id
        [HttpGet("{id}")]
        public Chord GetChord(int id)
        {
            return _repo.GetChord(id);
        }

        // post chord
        [HttpPost]
        public Chord PostChord(Chord newChord)
        {
            return _repo.PostChord(newChord);
        }

        // post chord/id
        [HttpPut("{id}")]
        public Chord UpdateChord(Chord updatedChord, int id)
        {
            updatedChord.Id = id;
            return _repo.UpdateChord(updatedChord);
        }

        // delete chord/id
        [HttpDelete("{id}")]
        public bool DeleteChord(int id)
        {
            return _repo.DeleteChord(id);
        }
    }
}