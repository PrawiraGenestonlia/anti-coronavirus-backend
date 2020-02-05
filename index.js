const express = require('express');
const app = express();
const router = express.Router();
const { StatisticsApi, PreventionsApi } = require('./api');
const port = process.env.PORT || 4000;

//initialised api classes
const statistics = new StatisticsApi();
const preventions = new PreventionsApi();

//global routes
app.use('/api/images', express.static(__dirname + '/assets'));
app.use('/api', router);

//routes
router.get('/get-summary', async (req, res) => {
  const stats = await statistics.getSummary();
  res.send(stats);
});
router.get('/get-stats', async (req, res) => {
  const stats = await statistics.getStats();
  res.send(stats);
});
router.get('/get-images-path', async (req, res) => {
  const data = await preventions.getImageUrl("/api/images");
  res.send(data);
});


app.listen(port, () => {
  console.log(`App start at port ${port}!`);
  //test
});