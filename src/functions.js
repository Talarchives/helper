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
  },
  // https://github.com/countr/countr/blob/8826fb656e06fc51f7d66924893c73e33e818b96/src/constants/time.js#L9
  msToTime: (ms) => {
    const
      years = Math.floor(ms / 31536000000), yearsms = ms % 31536000000,
      months = Math.floor(yearsms / 2592000000),
      days = Math.floor((yearsms / 86400000) % 30), daysms = ms % 86400000,
      hours = Math.floor(daysms / 3600000), hoursms = ms % 3600000,
      minutes = Math.floor(hoursms / 60000), minutesms = ms % 60000,
      sec = Math.floor(minutesms / 1000);
  
    let str = '';
    if (years) str += `${years} year${this.pl(years)} `;
    if (months) str += `${months} month${this.pl(months)} `;
    if (days) str += `${days} day${this.pl(days)} `;
    if (hours) str += `${hours} hour${this.pl(hours)} `;
    if (minutes) str += `${minutes} minute${this.pl(minutes)} `;
    if (sec) str += `${sec} second${this.pl(sec)} `;
  
    return str;
  },
  pl: val => val === 1 ? '' : 's'
};