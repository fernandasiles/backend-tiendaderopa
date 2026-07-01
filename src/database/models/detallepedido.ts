import { Schema, model } from "mongoose";

const DetallePedidoSchema = new Schema(
  {
    pedido_id: {
      type: Schema.Types.ObjectId,
      ref: "Pedido",
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
    },

    precio_unitario: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model("DetallePedido", DetallePedidoSchema);