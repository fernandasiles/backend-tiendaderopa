import { Schema, model } from "mongoose";

const ProductoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    descripcion: {
      type: String,
      required: true,
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    talla: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    categoria: {
      type: String,
      required: true,
    },

    imagen_url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Producto", ProductoSchema);