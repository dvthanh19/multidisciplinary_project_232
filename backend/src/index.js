const express   = require("express")
const dotenv    = require("dotenv");
const session   = require("express-session");
const cors      = require("cors");
const SequelizeStore = require("connect-session-sequelize");
const routes    = require("./routes");
const db        = require("./config/database");



const app = express()
const port = 3000;

dotenv.config()

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(routes)
// routes(app)
// app.get('/', (req, res) => {
//     return res.send('INDEX PAGE');
// })


// app.listen(port, () => console.log('Listening on http://localhost:' + port))
app.listen(process.env.APP_PORT, () => console.log('Server up and running ...'));