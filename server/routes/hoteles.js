const express = require('express');
const app = express();
// const _ = require('underscore');
const data = require('../data/data.json');
const fs = require('fs');
const path = require('path');
const Hotel = require('../models/hotel');


app.get('/hotels', (req, res) => {
    let { limit = 10, page = 1, name = '', stars = '0' } = req.query;
    let stars_filters = stars.split(',');
    let data = require('../data/data.json');

    let hotels = data.filter( hotel => {
        if(hotel.name.toLowerCase().includes(name.toLowerCase()) 
            && (stars_filters.includes(hotel.stars.toString()) || stars == 0 ) )
        {
            return true;
        }
    });
    return res.json({
        filters: {stars,name},
        total: hotels.length,
        total_pages: Math.ceil(hotels.length / limit),
        page,
        limit,
        hotels
    });
});

app.get('/hotels/:id', (req, res) => {
    let id = req.params.id;
    let idx = data.findIndex(obj => obj.id === id);
    if(idx === -1 ){
        return res.json({
            err: true,
            message: 'Hotel no encontrado'               
        });
    }
    // let hotel = data.filter( hotel => hotel.id === id);
    let hotel = data[idx];
    return res.json({
            err: false,
            ...hotel

        }
    );
    
});




app.post('/hotel', (req, res) => {
    let {name = '',
        stars = 1,
        price = 0,
        image = 'no-image.jpg',
        amenities = []} = req.body;

    let hotel = new Hotel(
        Math.floor(Math.random() * 1000000),
        name,
        stars,
        price,
        image,
        amenities && amenities.split(',')
    );
    data.push(hotel);
    let pathFile = path.resolve(__dirname, `../data/data.json`);

    fs.writeFile(pathFile, JSON.stringify(data,null,2), 'utf8', function (err) {
        if (err) {
            return res.json({
                created: false                
            });
        }
        return res.json({
            created: true,
            hotel              
        });
    });

});

app.put('/hotel/:id', (req, res) => {
    let id = req.params.id;
    let {name,
        stars,
        price,
        image,
        amenities} = req.body;

    let idx = data.findIndex(obj => obj.id === id);
    if(idx === -1 ){
        return res.json({
            err: true,
            message: 'Hotel no encontrado'               
        });
    }
    let hotel_bkp = data[idx];
    let hotel = new Hotel(
        id,
        name || hotel_bkp.name,
        stars || hotel_bkp.stars,
        price || hotel_bkp.price,
        image || hotel_bkp.image,
        amenities ? amenities.split(',') : hotel_bkp.amenities
    );

    data.splice(idx,1);
    data.push(hotel);

    let pathFile = path.resolve(__dirname, `../data/data.json`);

    fs.writeFile(pathFile, JSON.stringify(data,null,2), 'utf8', function (err) {
        if (err) {
            return res.json({
                update: false                
            });
        }
        return res.json({
            update: true,
            hotel              
        });
    });
});

app.delete('/hotel/:id', (req, res) => {
    let id = req.params.id;

    let hotels = data.filter( hotel => hotel.id !== id);

    let pathFile = path.resolve(__dirname, `../data/data.json`);

    fs.writeFile(pathFile, JSON.stringify(hotels,null,2), 'utf8', function (err) {
        if (err) {
            return res.json({
                deleted: false                
            });
        }
        return res.json({
                    deleted: true                
                });
    });
});


module.exports = app;