import { Strategy as JwtStrategy } from "passport-jwt";
import UsuarioRepository from "../repositories/UsuarioRepository";
import UsuarioResource from "../resources/UsuarioResource";
import ApiError from "../errors/ApiError";
import { env } from "../config/env";

const cookieExtractor = (req: any) => {
  if (req && req.cookies) {
    return req.cookies.token;
  }

  return null;
};

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: env.authJwtSecret,
  },
  async (payload: any, done) => {
    try {
      const repository = new UsuarioRepository();

      const usuario = await repository.getById(payload.sub);

      if (!usuario) {
        return done(
          new ApiError({
            name: "UNAUTHORIZED_ERROR",
            message: "Usuario no encontrado",
            code: "ERR_UNAUTH",
            status: 401,
          }),
          false
        );
      }

      const resource = new UsuarioResource(usuario);

      return done(null, resource.item());
    } catch (error) {
      return done(error, false);
    }
  }
);

export default jwtStrategy;