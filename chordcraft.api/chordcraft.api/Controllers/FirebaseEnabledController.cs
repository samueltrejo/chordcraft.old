﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chordcraft.api.Controllers
{
    public abstract class FirebaseEnabledController : ControllerBase
    {
        protected string FirebaseId => User.FindFirst(claim => claim.Type == "user_id").Value;
        protected string FirebaseEmail => User.FindFirst(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value;
    }
}
