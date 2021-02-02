const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const app = express();

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        rejectUnauthorized: false,
        ssl: true,
        }

        // user: 'postgres',
        // password: 'nOMAD92*',
        // database: 'acc'
    

});



app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const trackList = {
    'Barcelona': 'barcelona',
    'Brands Hatch': 'brandshatch',
    'Hungaroring': 'hungaroring',
    'Kyalami': 'kyalami',
    'Laguna Seca': 'lagunaseca',
    'Misano': 'misano',
    'Monza': 'monza',
    'Mount Panorama': 'mountpanorama',
    'Nurburgring': 'nurburgring',
    'Paul Ricard': 'paulricard',
    'Silverstone': 'silverstone',
    'Spa Francorchamps': 'spa',
    'Suzuka': 'suzuka',
    'Zandvoort': 'zandvoort',
    'Zolder': 'zolder',

}

app.get('/', (req, res) => {
    res.send('its working');
});

app.post('/liters', (req, res) => {
    for (const [key, value] of Object.entries(trackList)) {
        if (req.body.track === key) {
            db.select('car', value).from('liters').where({ car: req.body.car })
                .then(data => {
                    const obj = data[0];
                    const obj2 = Object.values(obj);
                    res.json(obj2[1]);
                    console.log(obj2);
                })
                .catch(err => res.json(err))
        }
    }
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

// app.listen(process.env.PORT, console.log(`app is running on port ${process.env.PORT}`));
app.listen(3000);


