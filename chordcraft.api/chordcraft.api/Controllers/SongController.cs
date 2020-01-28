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
    public class SongController : FirebaseEnabledController
    {
        readonly SongRepository _repo;
        readonly UserRepository _userRepo;

        public SongController(SongRepository repo, UserRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
        }

        // get song
        [HttpGet]
        public IEnumerable<Song> GetSongs()
        {
            return _repo.GetSongs();
        }

        // get song/uid
        [HttpGet("uid")]
        public IEnumerable<Song> GetUserSongs()
        {
            User user = _userRepo.GetUser(FirebaseId);
            return _repo.GetSongs(user.Id);
        }

        // get song/id
        [HttpGet("{id}")]
        public Song GetSong(int id)
        {
            var song = _repo.GetSong(id);
            var user = _userRepo.GetUser(FirebaseId);
            song.IsOwner = song.OwnerId == user.Id;
            return song;
        }

        // post song
        [HttpPost]
        public Song PostSong(Song newSong)
        {
            return _repo.PostSong(newSong);
        }

        // put song/id
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