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
    public class SongController : Controller
    {
        readonly SongRepository _repo;

        public SongController(SongRepository repo)
        {
            _repo = repo;
        }

        // get song
        [HttpGet]
        public IEnumerable<Song> GetSongs()
        {
            return _repo.GetSongs();
        }

        // get song/id
        [HttpGet("{id}")]
        public Song GetSong(int id)
        {
            return _repo.GetSong(id);
        }

        // post song
        [HttpPost]
        public Song PostSong(Song newSong)
        {
            return _repo.PostSong(newSong);
        }

        // post song/id
        [HttpPut("{id}")]
        public Song UpdateSong(Song updatedSong, int id)
        {
            updatedSong.Id = id;
            return _repo.UpdateSong(updatedSong);
        }

        // delete song/id
        [HttpDelete("{id}")]
        public bool DeleteSong(int id)
        {
            return _repo.DeleteSong(id);
        }
    }
}