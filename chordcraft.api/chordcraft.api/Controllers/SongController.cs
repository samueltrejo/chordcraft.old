﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace chordcraft.api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SongController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}