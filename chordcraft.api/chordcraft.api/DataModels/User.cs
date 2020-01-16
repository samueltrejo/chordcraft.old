using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataModels
{
    public class User
    {
        public int Id { get; set; }
        public int FirebaseUid { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
    }
}
