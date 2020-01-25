using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataTransferObject
{
    public class LyricWithChords
    {
        public int Id { get; set; }
        public string Verse { get; set; }
        public int SongId { get; set; }
        public bool IsDeleted { get; set; }
        public IEnumerable<RichChord> Chords { get; set; }
    }
}
