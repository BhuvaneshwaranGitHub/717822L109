const axios = require("axios");

let windowNumbers = [];

const getAverage = async (req, res) => {
  const { numberType } = req.params;
  const windowSize = parseInt(process.env.WINDOW_SIZE, 10);
  const apiUrl = `${process.env.THIRD_PARTY_API_BASE_URL}/${numberType}`;
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjI0NjU3LCJpYXQiOjE3NDI2MjQzNTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJlNWMxMDVkLTcwNjAtNDE2OS04YmY3LWNiZDMzNDgyOTMwOSIsInN1YiI6ImJodXZhbmVzaHNrMTRAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiS2FycGFnYW0iLCJjbGllbnRJRCI6ImJlNWMxMDVkLTcwNjAtNDE2OS04YmY3LWNiZDMzNDgyOTMwOSIsImNsaWVudFNlY3JldCI6Ill6TUVzTmNwTkxJTlFpZ3oiLCJvd25lck5hbWUiOiJCaHV2YW5lc2h3YXJhbiBSIiwib3duZXJFbWFpbCI6ImJodXZhbmVzaHNrMTRAZ21haWwuY29tIiwicm9sbE5vIjoiNzE3ODIyTDEwOSJ9.W8zM90scFvGswbuHTdVJLvQe3k9bT1lKHzYgcC3-jQM";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: 500,
    });

    const fetchedNumbers = response.data.numbers || [];
    fetchedNumbers.forEach((num) => {
      if (!windowNumbers.includes(num)) {
        if (windowNumbers.length >= windowSize) {
          windowNumbers.shift();
        }
        windowNumbers.push(num);
      }
    });
    const average =
      windowNumbers.length > 0 ? windowNumbers.reduce((sum, num) => sum + num, 0) / windowNumbers.length: 0;
    res.json({
      windowPrevState: [...windowNumbers],
      windowCurrState: windowNumbers,
      numbers: fetchedNumbers,
      avg: average.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
};

module.exports = { getAverage };