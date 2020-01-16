using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataModels
{
    public class ChordNote
    {
        public int Id { get; set; }
        public int ChordId { get; set; }
        public int NoteId { get; set; }
        public int IsDeleted { get; set; }
    }
}
