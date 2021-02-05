const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        rejectUnauthorized: false,
        }
});


// const db = knex({
//     client: 'pg',
//     connection: {
//       host: '127.0.0.1',
//       user: 'postgres',
//       password: 'nOMAD92*',
//       database: 'acc'
//     }
    

// });


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
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('its working');
});
app.get('/cars', (req,res) =>{
    db.select('car').from('liters').orderBy('car')
    .then(cars => {
       const arr = []; 
       const carList = [];
       cars.forEach(car => {
         arr.push(Object.values(car));
        })
       arr.forEach(car => {
           carList.push(car[0]);
       })
        console.log(carList);
        res.json(carList)
    })
    .catch( err => res.json(err)
    )
})
app.get('/tracks', (req,res) =>{
    db.select('car').from('liters').orderBy('car')
    .then(cars => {
       const arr = []; 
       const carList = [];
       cars.forEach(car => {
         arr.push(Object.values(car));
        })
       arr.forEach(car => {
           carList.push(car[0]);
       })
        console.log(carList);
        res.json(carList)
    })
    .catch( err => res.json(err)
    )
})


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

app.listen(process.env.PORT, console.log(`app is running on port ${process.env.PORT}`));
// app.listen(3000);




