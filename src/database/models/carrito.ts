import { Schema, model } from "mongoose";

const CarritoSchema = new Schema(
  {
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    producto_id: {
      type: Schema.Types.ObjectId,
      ref: "Producto",
      required: true,
    },

    cantidad: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Carrito", CarritoSchema);