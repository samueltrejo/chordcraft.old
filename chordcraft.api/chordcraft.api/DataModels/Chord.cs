using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataModels
{
    public class Chord
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Root { get; set; }
        public string Quality { get; set; }
        public int SongId { get; set; }
        public int Note1 { get; set; }
        public int Note2 { get; set; }
        public int Note3 { get; set; }
        public bool IsDeleted { get; set; }
    }
}
