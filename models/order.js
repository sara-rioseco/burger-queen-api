const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const { ObjectId } = require('mongodb');

const getDateAndTime = () => {
  const now = new Date();
  return now.toISOString().replace(/[TZ]+/gm, ' ').substring(0, 19);
};

const orderSchema = new Schema({
  _id: {
    type: ObjectId,
    ref: 'Order ID',
  },
  userId: {
    type: String,
    ref: 'User ID',
    required: true,
  },
  client: {
    type: String,
    ref: 'Client name',
    required: true,
  },
  table: {
    type: Number,
    ref: 'Table number',
    required: true,
  },
  products:
    {
      type: Array,
      required: true,
      ref: 'Product List',
      value: [
        {
          qty: {
            type: Number,
            ref: 'Product amount',
            required: true,
          },
          product: {
            id: {
              type: String,
              ref: 'Product ID',
              required: true,
            },
            name: {
              type: String,
              ref: 'Product name',
              required: true,
            },
            price: {
              type: Number,
              ref: 'Product price',
              required: true,
            },
            image: {
              type: String,
              ref: 'Product image url',
              required: true,
            },
            type: {
              type: String,
              ref: 'Product type',
              enum: ['Desayuno', 'Almuerzo'],
              required: true,
            },
            dateEntry: {
              type: String,
              ref: 'Product entry date',
              required: true,
            },
          },
        },
      ],
    },
  status: {
    type: String,
    ref: 'Order Status',
    enum: ['En preparación', 'Listo en barra', 'Entregado'],
    default: 'En preparación',
  },
  dateEntry: {
    type: String,
    ref: 'Order Entry Date',
    default: getDateAndTime(),
  },
});

const Order = model('Order', orderSchema);
module.exports = Order;
