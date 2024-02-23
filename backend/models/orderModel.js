const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    productRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        index: true,
    },
    orderStatus: {
        type: String,
        enum: ["Pendiente", "En Proceso", "Enviado", "Entregado"],
        default: "Pendiente",
    },
    parcelService: {
        type: String, 
        trim: true 
    },
    trackingNumber: {
        type: Number,
        trim: true, 
        default: 0 
    }
  },
  {
    timestamps: true,
  }
  
);

module.exports = Order = mongoose.model("Order", orderSchema);
