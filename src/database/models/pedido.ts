import { Schema, model } from "mongoose";

export const ESTADOS_PEDIDO = [
  "pendiente",
  "pagado",
  "enviado",
  "entregado",
] as const;

const PedidoSchema = new Schema(
  {
    usuario_id: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    fecha: {
      type: Date,
      default: Date.now,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    estado: {
      type: String,
      enum: ESTADOS_PEDIDO,
      default: "pendiente",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Pedido", PedidoSchema);