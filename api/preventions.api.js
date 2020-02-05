const path = require('path');
const fs = require('fs');

class Preventions {
  async walkSync(dir, filelist) {
    var self = this; // Get a reference to your object.
    let files = fs.readdirSync(dir);
    filelist = filelist || {};
    files.forEach(async function (file) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = await self.walkSync(path.join(dir, file), filelist);
      }
      else {
        let folder = dir.substr(dir.lastIndexOf('/') + 1);
        if (filelist[folder]) {
          filelist[folder].push(file);
        } else {
          filelist[folder] = [file];
        }
      }
    });
    return filelist;
  };

  async getImageUrl(apiPath) {
    const directoryPath = path.join(__dirname, '../assets');
    let data = await this.walkSync(directoryPath);
    let dataKeys = Object.keys(data);
    let output = {};
    dataKeys.forEach(d => {
      let temp = [];
      data[d].forEach(e => {
        let tempPath = apiPath + "/" + d + "/" + e;
        temp.push(tempPath);
      });
      output[d] = temp;
    });
    return output;
  };
}

module.exports = Preventions;