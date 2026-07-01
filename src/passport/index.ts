import passport from "passport";

import localStrategy from "./localStrategy";
import jwtStrategy from "./jwtStrategy";

// Login
passport.use("local", localStrategy);

// Protección con JWT
passport.use("jwt", jwtStrategy);

export default passport;