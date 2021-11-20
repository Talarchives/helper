// contains functions
const fs = require('fs'), path = require('path');
module.exports = {
  // https://github.com/discord-akairo/discord-akairo/blob/905f69382957023601ebbb6f8a3a8b6b0f615bd1/src/struct/AkairoHandler.js#L234
  readdirRecursive: (directory) => {
    const result = [];
  
    (function read(dir) {
      const files = fs.readdirSync(dir);
  
      for (const file of files) {
        const filepath = path.join(dir, file);
  
        if (fs.statSync(filepath).isDirectory()) {
          read(filepath);
        } else {
          result.push(filepath.replace(/\\/g, '/'));
        }
      }
    }(directory));
  
    return result;
  }
};