using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.DataModels
{
    public class Note
    {
        public int Id { get; set; }
        public string Natural { get; set; }
        public string Sharp { get; set; }
        public string Flat { get; set; }
        public string Sound { get; set; }
        public bool IsNatural { get; set; }
        public bool IsDeleted { get; set; }
    }
}
