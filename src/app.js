import express from 'express'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import * as getWeather from "./getWeather.js";
import * as getGeoCode from "./getGeoCode.js";
import chalk from "chalk";
import dotenv  from "dotenv"

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../templates/partials")
const viewsPath = path.join(__dirname, '../templates/views')

dotenv.config({path:path.join(__dirname,'../keys.env')})

const server = express()

server.set('view engine', "hbs")
server.set('views', viewsPath);
hbs.registerPartials(partialsPath)

server.use(express.static(publicPath))

server.get('', (req, res) => {
    res.render('index', {
        title: "Home",
        creator: "Kishalay Pandey",
        work: "Web Development"

    })
})

server.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        creator: "Kishalay Pandey",
        img_title: "This is me from 2016",
        about: "About me? nothing much I am Just Relaxing with JS"

    })
})

server.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.render("weather",{
             title: "Weather",
             msg:"Please provide a Location to Search Weather",
             creator: "Kishalay Pandey",
             img_link:"./img/weather.png",
             about: "About me? nothing much I am Just Relaxing with JS"
         })
    }
    let ldata = {}
        if (address) {
            getGeoCode.default(address, (err, gdata={}) => {
                if (err) {
                    return res.send({
                        title: "Weather",
                        msg:"Sorry, Requested location not found!",
                        creator: "Kishalay Pandey",
                        img_link: "./img/weather.png",
                        about: "About me? nothing much I am Just Relaxing with JS"
                    })
                }
                ldata = gdata
                getWeather.default(ldata, (werr, wtdata) => {
                    if (werr) {
                        console.log(chalk.bold.red(werr))
                    }
                    else {
                        const {location,weather_description,precipitation,temperature_statement,img_link} = wtdata
                        res.send({
                            title: "Weather",
                            creator: "Kishalay Pandey",
                            location: req.query.address,
                            msg:"Search Sucessful!",
                            img_link,
                            weather:{location,weather_description,precipitation,temperature_statement},
                            about: "About me? nothing much I am Just Relaxing with JS"
                        })
                    }
                });
            })
        } else {
           res.send({
            title: "Weather",
            msg:"Please provide a Location to Search Weather",
            creator: "Kishalay Pandey",
            img_link: "./img/weather.png",
            about: "About me? nothing much I am Just Relaxing with JS"
        })
        }
})

server.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({error:"please Provide A search Term"})
    }
    console.log(req.query)
    res.send({products:[]})
})

server.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        creator: "Kishalay Pandey",
        about: "About me? nothing much I am Just Relaxing with JS"
    })
})

server.get('/help/*', (req, res) => {
    res.render('notfound_404', {
        title: "Help Page Not Found",
        creator: "Kishalay Pandey",
        about: "About me? nothing much I am Just Relaxing with JS"
    })
})

server.get('*', (req, res) => {
    res.render('notfound_404', {
        title: "Page Not Found",
        creator: "Kishalay Pandey",
        about: "About me? nothing much I am Just Relaxing with JS"
    })
})

server.listen(3000, (req, res) => { console.log("Started Server on Port:3000") })