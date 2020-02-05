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
router.get('/get-images-path', async (req, res) => {
  const data = await preventions.getImageUrl("/api/images");
  res.send(data);
});
router.get('/get-summary', async (req, res) => {
  const stats = await statistics.getSummary();
  res.send(stats);
});
router.get('/get-stats', async (req, res) => {
  const stats = await statistics.getStats();
  res.send(stats);
});



app.listen(port, async () => {
  console.log(`App start at port ${port}!`);
  //test
  let results = await statistics.getDaily()
  console.log(results);
});