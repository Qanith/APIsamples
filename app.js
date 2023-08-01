const express = require('express');
const { engine } = require('express-handlebars');
const axios = require('axios');

const app = express();
const port = 3000;

// Configure Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Route to fetch weather data from the API and render it in the template
app.get('/', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: {
                q: '53.1,-0.13'
            },
            headers: {
                'X-RapidAPI-Key': '89c3cb9484msh8262e76e236c308p12b330jsn506f4fe415f9',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const weatherData = response.data;

        res.render('weather', { weatherData });
    } catch (error) {
        console.error('Error occurred:', error.message);
        console.error('API Response:', error.response.data);
        res.status(500).send('Something went wrong');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});