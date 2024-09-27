const mongoose = require('mongoose');

// Define a schema for IPO data
const ipoSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  companyName: { type: String, required: true },
  series: { type: String, default: 'N/A' },
  issueStartDate: { type: String, required: true },
  issueEndDate: { type: String, required: true },
  status: { type: String, required: true },
  issueSize: { type: String, default: 'N/A' },
  issuePrice: { type: String, default: 'N/A' },
  noOfSharesOffered: { type: String, required: true },
  noOfsharesBid: { type: String, required: true },
  noOfTime: { type: String, required: true }
});

// Create and export the model
module.exports = mongoose.model('Ipo', ipoSchema);
