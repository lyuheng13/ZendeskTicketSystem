var express = require('express');
var cors = require('cors')
var app = express();
var helmet = require('helmet')
const axios = require('axios').default;

//Basic authenticatioin hash used to authorized device to connect to Zendesk
//*Tested by Rainbow Table
const authKey = "Basic bHl1aGVuZzEzQGdtYWlsLmNvbToyNjUzMjczOEBZaHo="

//Enable CORS request and helmet middleware
app.use(cors())
app.use(helmet())

/*
 * Description:
 * GET interface that requesting a the total number of tickets stored in Zendesk Cloud
 *
 * Return:
 * Total tickets number presented by a JSON data
 */
app.get('/tickets/count', function(req, res) {

    axios.get("https://zcclance.zendesk.com/api/v2/tickets/count", {
      headers: {Authorization: authKey}
    })
    .then(response => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response.data);
    })
    .catch(function(error) {
      res.status(500).json(error);
    });

});

/*
 * Description:
 * GET interface that requesting a list of ticket information based on the pagenum
 *
 * Parameter:
 * pagenum (Integer) / the page number currently viewed by user in the front-end
 *
 * Return:
 * An array of JSON each representing a detailted ticket information
 */
app.get('/tickets/:pagenum', function(req, res){

  //Creating list of requesting ticket number separated by comma
  var num = req.params.pagenum;
  var startTicket = (num - 1) * 25 + 1;
  var ids = "";

  for (let i = startTicket; i < startTicket + 24; i++) {
    ids += i + ',';
  }
  ids += (startTicket + 24).toString();

  axios.get("https://zcclance.zendesk.com/api/v2/tickets/show_many.json?ids=" + ids, {
    headers: {Authorization: authKey}
  })
  .then(response => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response.data.tickets);
  })
  .catch(function(error) {
    res.status(500).json(error);
  });
});

app.listen(3001);