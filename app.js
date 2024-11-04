
const express = require('express')

const bodyParser = require('body-parser');
//--------------------------
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'ejs');

require('./routes/home.router')(app);
require('./routes/category.router')(app);
require('./routes/product.router')(app);


app.listen(PORT, function() {
    console.log('Máy chủ mở cổng http://localhost:3000')
});
