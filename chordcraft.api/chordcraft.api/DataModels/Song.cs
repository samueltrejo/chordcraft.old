using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataModels
{
    public class Song
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Artist { get; set; }
        public string Genre { get; set; }
        public int OwnerId { get; set; }
        public int Transposition { get; set; }
        public string Lyrics { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsOwner { get; set; } = false;
    }
}
