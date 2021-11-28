var express = require('express');
var app = express();
var cors = require('cors')
const axios = require('axios').default;
const authKey = "Basic bHl1aGVuZzEzQGdtYWlsLmNvbToyNjUzMjczOEBZaHo="

//Enable CORS request
app.use(cors())

//Get the total number of ticket counts stored on the cloud
app.get('/tickets/count', function(req, res) {
  const sendGetCountRequest = async () => {
    const response = await axios.get("https://zcclance.zendesk.com/api/v2/tickets/count", {
      headers: {
        Authorization: authKey
      }
    });

    if (response.status != 200) {
      res.status(500).json({error: "Internal request error"})
    }

    console.log(response.data.count.value);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response.data);
  }

  sendGetCountRequest();
});


//Get ith 25 tickets from the Zendesk API based on request pagenum
app.get('/tickets/:pagenum', function(req, res){

  //Creating comma seperate list of requesting ticket num
  var num = req.params.pagenum;
  var startTicket = (num - 1) * 25 + 1;
  var ids = "";
  for (let i = startTicket; i < startTicket + 24; i++) {
    ids += i + ',';
  }
  ids += (startTicket + 24).toString();

  console.log("https://zcclance.zendesk.com/api/v2/tickets/show_many.json?ids=" + ids);

    axios.get("https://zcclance.zendesk.com/api/v2/tickets/show_many.json?ids=" + ids, {
      headers: {
        Authorization: authKey
      }
    })
    .then(response => {
      console.log(response)
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response.data.tickets);
    })
    .catch( function(error) {
      console.log(error);
      res.status(500).json(error);
    });
});

app.listen(3001);