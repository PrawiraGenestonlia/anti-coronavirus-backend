const tabletojson = require('tabletojson');
const axios = require('axios');

class statistics {
  async status() {
    console.log("statistic api is running...");
  }

  async getHTML(url) {
    const res = await axios(url);
    return res.data;
  }

  async getSummary() {
    return new Promise((resolve, reject) => {
      try {
        tabletojson.convertUrl('https://www.worldometers.info/coronavirus/',
          function (tablesAsJson) {
            console.log(tablesAsJson);
            let data = { "Total Cases": 0, "Total Deaths": 0, "Total Recovered": 0, "Total Critical": 0 };
            tablesAsJson[0].map(d => {

              data["Total Cases"] += Number(d["Total Cases"].replace(",", ""));
              data["Total Deaths"] += d["Total Deaths"] ? Number(d["Total Deaths"].replace(",", "")) : 0;
              data["Total Recovered"] += d["Total Recovered"] ? Number(d["Total Recovered"].replace(",", "")) : 0;
              data["Total Critical"] += d["Serious,  Critical"] ? Number(d["Serious,  Critical"].replace(",", "")) : 0;
            })
            resolve(data);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  async getStats() {
    return new Promise((resolve, reject) => {
      try {
        tabletojson.convertUrl('https://www.worldometers.info/coronavirus/',
          function (tablesAsJson) {
            //
            let output = tablesAsJson[0].map(d => {
              if (d.hasOwnProperty("Serious,  Critical")) {
                d['Total Critical'] = d['Serious,  Critical'];
                delete d['Serious,  Critical'];
              }
              if (d.hasOwnProperty("Country, Other")) {
                d['Country, Territory'] = d['Country, Other'];
                delete d['Country, Other'];
              }
              return d;
            })
            resolve(output);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  async getDaily() {
    return new Promise((resolve, reject) => {
      try {
        tabletojson.convertUrl('https://www.worldometers.info/coronavirus/coronavirus-cases/',
          function (tablesAsJson) {
            resolve(tablesAsJson[0]);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

}

module.exports = statistics;