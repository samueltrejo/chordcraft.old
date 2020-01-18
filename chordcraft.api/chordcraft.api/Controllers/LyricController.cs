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
    public class LyricController : Controller
    {
        readonly LyricRepository _repo;

        public LyricController(LyricRepository repo)
        {
            _repo = repo;
        }

        // get lyric
        [HttpGet]
        public IEnumerable<Lyric> GetLyrics()
        {
            return _repo.GetLyrics();
        }

        // get lyric/id
        [HttpGet("{id}")]
        public Lyric GetLyric(int id)
        {
            return _repo.GetLyric(id);
        }

        // post lyric
        [HttpPost]
        public Lyric PostLyric(Lyric newLyric)
        {
            return _repo.PostLyric(newLyric);
        }

        // post lyric/id
        [HttpPut("{id}")]
        public Lyric UpdateLyric(Lyric updatedLyric, int id)
        {
            updatedLyric.Id = id;
            return _repo.UpdateLyric(updatedLyric);
        }

        // delete lyric/id
        [HttpDelete("{id}")]
        public bool DeleteLyric(int id)
        {
            return _repo.DeleteLyric(id);
        }
    }
}