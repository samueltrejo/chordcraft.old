using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataModels
{
    public class Lyric
    {
        public int Id { get; set; }
        public string Verse { get; set; }
        public int SongId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
