const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    productRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        index: true,
    },
    adviserRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    orderStatus: {
        type: String,
        enum: ["Pendiente", "En Proceso", "Enviado", "Entregado"],
        default: "Pendiente",
    },
    parcelService: {
        type: String, 
        //trim: true 
    },
    trackingNumber: {
        type: String,
        //trim: true,  
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
  
);

module.exports = Order = mongoose.model("Order", orderSchema);
