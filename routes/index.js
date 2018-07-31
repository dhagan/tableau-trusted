var express = require('express');
var router = express.Router();
const request = require('request-promise-native');
const tableauServer = 'http://localhost/trusted';
const username = 'makani';
const reportPath = '/views/Regional/College'


/* GET home page. */
router.get('/', function(req, res, next) {

  getTrustedTicket(tableauServer, username)
    .then((ticket) => {
      res.render('index', { urlPath:  tableauServer + '/' + ticket + '/' + reportPath });
    });
});

function getTrustedTicket (server, username) {
  return request({
    method:'POST',
    uri: server + '?username=' + username,
    rejectUnauthorized:false
  }).then ((ticket) => {
    if (ticket.toString() === '-1'){
      throw new Error('Tableau server did not return a ticket.')
    }
    return ticket;
  });
}

module.exports = router;
