const moment = require("moment");

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a') // formats the time to 12 hour format with am/pm
    }
}

module.exports = formatMessage;