using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataModels
{
    public class LyricChord
    {
        public int Id { get; set; }
        public int LyricId { get; set; }
        public int ChordId { get; set; }
        public string Indentation { get; set; }
        public bool IsDeleted { get; set; }
    }
}
