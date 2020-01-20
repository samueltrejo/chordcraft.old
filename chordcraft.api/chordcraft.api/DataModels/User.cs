using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataModels
{
    public class User
    {
        public int Id { get; set; }
        public string FirebaseUid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Avatar { get; set; }
        public string Bio { get; set; }
        public bool IsDeleted { get; set; }
    }
}
