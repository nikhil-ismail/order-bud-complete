const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');

require('dotenv/config');
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());
//app.use(authJwt());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const businessRoutes = require('./routes/businesses');
const searchRoutes = require('./routes/search');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/businesses`, businessRoutes);
app.use(`${api}/search`, searchRoutes);

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...');
})
.catch((err)=> {
    console.log(err);
})

//Server
app.listen(3000, () => {
    console.log('server is running http://localhost:3000');
})