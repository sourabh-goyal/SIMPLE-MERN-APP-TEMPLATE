'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const { Types } = Schema;

const Expenses = new Schema({
  description: {type: Types.String},
  amount: {type: Types.Number},
  expander: {type: Types.String},
  date: {type: Types.Date, default: Date.now},
  tags: [Types.String],
  active: {type: Types.Boolean, default: true},
  created_at: {type: Types.Date, default: Date.now},
  updated_at: {type: Types.Date, default: Date.now}
});

export default mongoose.model('expenses', Expenses);