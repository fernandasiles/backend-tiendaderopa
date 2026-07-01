import { Schema, model } from "mongoose";

export const ROLES = [
  "ADMIN",
  "CLIENTE",
] as const;

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    rol: {
      type: String,
      enum: ROLES,
      default: "CLIENTE",
      required: true,
    },

    direccion: {
      type: String,
      required: true,
    },

    telefono: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Usuario", UsuarioSchema);