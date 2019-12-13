var bodyParser = require('body-parser')
var express = require('express')
var path = require('path')
var https = require('https')
var fs = require('fs')
var nodeMailer = require('nodemailer');
var cors = require('cors');
const app = express()
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
const router = express.Router()
const staticFiles = express.static(path.join(__dirname, '/public'))
app.use(staticFiles)

var totalOrders = 3;

  const inventoryState = {
    stock: [
    {
      id: 0,
      name: 'char-siu chicken bahn mi',
      description: 'char-siu chicken thighs on toasted baguette with vietnamese pickled veg and sambal aioli',
      price: 7,
      count: 20,
      img: 'katsu-format.png',
      sticker: '1.png' },
    {
      id: 1,
      name: 'cauliflower grilled cheese',
      description: 'cauliflower, bechamel, parmesan & fontina',
      price: 6,
      count: 17,
      img: 'grilled-format.png',
      sticker: '2.png'  },
    {
      id: 2,
      name: 'caramel-chocolate-pretzel cookies',
      description: 'caramel pretzel chocolate chip cookies with sea salt',
      price: 1,
      count: 56,
      img: 'cookie-format.png',
      sticker: '3.png'  },
    {
      id: 3,
      name: 'mac and cheese',
      description: 'baked and breaded mac & cheese with green onions and bacon',
      price: 3,
      count: 24,
      img: 'mac-format.png',
      sticker: '4.png'  }] }


router.get('/get-stock', (req, res) => {
  console.log("Stock API called");
  res.json(inventoryState)
})

router.post('/send-email', function (req, res) {
      totalOrders++;
      console.log("ORDER PLACED!");
      console.log("ORDER #: " + totalOrders);
      
      var orderInfo = "";
      console.log("Total orders: " + totalOrders);
      console.log(req.body.customerCart);
      console.log(req.body.customerInfo);
      req.body.customerCart.map((orderItem) => {
         console.log("COUNT: " + orderItem.count);
         console.log("NAME: " + orderItem.name); 
         console.log("PRICE: " + orderItem.price);

         orderInfo += '<br/><b>Item: </b>' + orderItem.name +
          '<br/><b>Count: </b>' + orderItem.count +
          '<br/><b>Price: </b>' + orderItem.price + '<br/>'


        inventoryState.stock.map(stockItem => {
          if (String(orderItem.name) === stockItem.name) {
            console.log("Before: " + stockItem.count)
            stockItem.count = stockItem.count - orderItem.count
            console.log("After: " + stockItem.count)
          }

        })
      })

      


      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: '',
              pass: ''
          }
      });
      let mailOptions = {
          from: 'sender@email.com', // sender address
          to: 'wearet86@gmail.com', // list of receivers
          subject: 'Order ' + totalOrders, // Subject line
          text: req.body.body, // plain text body
          html: '<b>Order</b><br/>' + orderInfo +
          '<br/><br/><br/><b>Info</b><br/>' +
          '<br/><b>Name: </b>' + req.body.customerInfo.name +
          '<br/><b>Phone: </b>' + req.body.customerInfo.phone +
          '<br/><b>Address: </b>' + req.body.customerInfo.address +
          '<br/><b>Instructions: </b>' + req.body.customerInfo.instructions 
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          	  

              console.log('Message %s sent: %s', info.messageId, info.response);
              res.sendStatus(200)
          });
      });

app.use(router)
app.use('/*', staticFiles)
app.set('port', (process.env.PORT || 3001))

/*
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app) */
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})