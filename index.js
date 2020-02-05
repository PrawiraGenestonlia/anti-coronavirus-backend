const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const { StatisticsApi, PreventionsApi } = require('./api');
const port = process.env.PORT || 4000;

//initialised api classes
const statistics = new StatisticsApi();
const preventions = new PreventionsApi();

//middlewares
app.use(cors());
app.use('/ncov-api/images', express.static(__dirname + '/assets'));
app.use('/ncov-api/', router);

//routes
router.get('/', async (req, res) => {
  res.send("Server is running");
});
router.get('/api-summary', async (req, res) => {
  res.send(require('./summary'));
});
router.get('/get-images-path', async (req, res) => {
  const data = await preventions.getImageUrl("ncov-api/images");
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
router.get('/get-daily', async (req, res) => {
  const stats = await statistics.getDaily();
  res.send(stats);
});



app.listen(port, async () => {
  console.log(`App start at port ${port}!`);
  //test
});