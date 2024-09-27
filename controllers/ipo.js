const axios = require('axios');
const Ipo = require('../models/ipo');

// Set up the headers to mimic a browser request and avoid being blocked
const axiosInstance = axios.create({
  baseURL: 'https://www.nseindia.com',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Referer': 'https://www.nseindia.com',
  }
});

exports.fetchAndStoreIpoData = async (req, res) => {
  try {
    // Fetch the data with the custom headers
    const response = await axiosInstance.get('/api/ipo-current-issue');
    const ipoData = response.data;

    await Promise.all(
      ipoData.map(async (ipo) => {
        const existingIpo = await Ipo.findOne({ symbol: ipo.symbol });
        if (!existingIpo) {
          const newIpo = new Ipo({
            symbol: ipo.symbol,
            companyName: ipo.companyName,
            series: ipo.series || 'N/A',
            issueStartDate: ipo.issueStartDate,
            issueEndDate: ipo.issueEndDate,
            status: ipo.status,
            issueSize: ipo.issueSize || 'N/A',
            issuePrice: ipo.issuePrice || 'N/A',
            noOfSharesOffered: ipo.noOfSharesOffered,
            noOfsharesBid: ipo.noOfsharesBid,
            noOfTime: ipo.noOfTime
          });
          await newIpo.save();
          console.log(`IPO data for ${ipo.companyName} saved successfully.`);
        } else {
          console.log(`IPO data for ${ipo.companyName} already exists. Skipping...`);
        }
      })
    );

    res.status(200).send('IPO data fetched and stored in the database.');

  } catch (error) {
    console.error('Error fetching or saving data:', error);
    res.status(500).send('An error occurred while fetching or storing IPO data.');
  }
};
