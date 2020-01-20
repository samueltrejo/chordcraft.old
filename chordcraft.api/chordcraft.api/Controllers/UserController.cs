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
    public class UserController : FirebaseEnabledController
    {
        readonly UserRepository _repo;

        public UserController(UserRepository repo)
        {
            _repo = repo;
        }

        // get user
        [HttpGet]
        public IEnumerable<User> GetUsers()
        {
            return _repo.GetUsers();
        }

        // get user/id
        [HttpGet("{id:int}")]
        public User GetUser(int id)
        {
            return _repo.GetUser(id);
        }

        // get user/uid
        [HttpGet("{uid}")]
        public User GetUser(string uid)
        {
            return _repo.GetUser(uid);
        }

        // post user
        [HttpPost]
        public User PostUser(User newUser)
        {
            newUser.FirebaseUid = FirebaseId;
            newUser.Email = FirebaseEmail;
            return _repo.PostUser(newUser);
        }

        // post user/id
        [HttpPut("{id}")]
        public User UpdateUser(User updatedUser, int id)
        {
            updatedUser.Id = id;
            return _repo.UpdateUser(updatedUser);
        }

        // delete user/id
        [HttpDelete("{id}")]
        public bool DeleteUser(int id)
        {
            return _repo.DeleteUser(id);
        }
    }
}