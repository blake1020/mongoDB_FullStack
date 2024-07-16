require('dotenv').config(); //requires dot env file 
const express = require('express')
const app = express();
const port = process.env.port;
const conn = require('./db/conn')
const fruitRoutes = require('./routes/fruits')
const Fruit = require('./models/fruit')
const starterFruits = require('./db/seed')
conn()

//VIEW ENGINE
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//MIDDLEWARE
app.use(express.json())
app.use('/fruits', fruitRoutes)

//ROUTES
app.get('/',(req,res) =>{
    res.send('Home Route!')
})

//creating route for seed data
app.get('/fruits/seed', async (req,res) => {
    try{
        await Fruit.deleteMany({})
        await Fruit.create(starterFruits)
        res.json(starterFruits)
    } catch (error) {
        console.log(`Something went wrong loading seed data ${error.message}`)
    }
})


app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`)
})