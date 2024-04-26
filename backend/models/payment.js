const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
   
    
    bankId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    totalAmount: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    gatewayName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    
    paymentMode: {
        type: String,
        required: true
    },
    payment_Date: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Payment", paymentSchema);