import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import initApiRoute from './route/api';
import bodyParser from 'body-parser';
import connection from './config/connectDB';
import configCors from './config/cors';
import cookieParser from 'cookie-parser';
require('dotenv').config();
// var morgan = require('morgan')

const app = express();
const port = process.env.PORT || 8080;


configCors(app)

configViewEngine(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
connection();

app.use(cookieParser());

initWebRoutes(app);
initApiRoute(app);


// app.use((req, res) => {
//     return res.render('404.ejs')
// })

app.use((req, res) => {
    return res.send('404 not found')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

