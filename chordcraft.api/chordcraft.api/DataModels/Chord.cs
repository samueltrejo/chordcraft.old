using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataModels
{
    public class Chord
    {
        public int Id { get; set; }
        public int RootNoteId { get; set; }
        public int SongId { get; set; }
        public string Quality { get; set; }
        public bool IsDeleted { get; set; }
    }
}
