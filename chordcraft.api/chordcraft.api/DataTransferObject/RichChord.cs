using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataTransferObject
{
    public class RichChord
    {
        public int Id { get; set; }
        public int LyricChordId { get; set; }
        public int RootNoteId { get; set; }
        public string Quality { get; set; }
        public string Indentation { get; set; }
        public IEnumerable<RichNote> Notes { get; set; }
    }
}
