let express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    database = require('./db'),
    bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connect suc');
}, error => {
    console.log('cannot con' + error)
})

const userAPI = require('./routes/user.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

app.use('/api', userAPI);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('connect port'+port)
})

app.use((req, res, next) => {
    next(createError(404))
})

app.use(function(err, req, res, next){
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})