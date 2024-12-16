const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = "https://lgyddipgmtgiaaccuvbj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxneWRkaXBnbXRnaWFhY2N1dmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMzYxMjIsImV4cCI6MjA0OTYxMjEyMn0.teu3lrjAkzWuytqKT2UWOudX7wXWtDZHM6h7CT7FOpM"
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
    res.sendFile('public/home.html', { root: __dirname });
  });
  
app.get('/countries', async (req, res) => {
    console.log('Attempting to get all rows.');

    const { data, error } = await supabase.from('countries').select();

    if (error) {
        console.log('Error:', error);
        res.send(error);
    } else {
        console.log('Successfully Retrieved Data');
        res.send(data);
    }
});

app.get('/past_conversions', async (req, res) => {
    console.log('Attempting to get all rows.');

    const { data, error } = await supabase.from('past_conversions').select();

    if (error) {
        console.log('Error:', error);
        res.send(error);
    } else {
        console.log('Successfully Retrieved Data');
        res.send(data);
    }
});

app.post('/credentials', async (req, res) => {
    console.log('Attempting to add row.');
    console.log('Request', req.body);

    const user_username = req.body.user_username;
    const user_password = req.body.user_password;

    const { data, error } = await supabase
        .from('credentials')
        .insert({
        user_username: user_username,
        user_password: user_password,
        })
        .select();

    if (error) {
        console.log('Error:', error);
        res.send(error);
    } else {
        console.log('Successfully Added User');
        res.send(data);
    }
});

app.post('/past_conversions', async (req, res) => {
    console.log('Attempting to add row.');
    console.log('Request', req.body);

    const user_username = req.body.user_username;
    const start_currency = req.body.start_currency;
    const end_currency = req.body.end_currency;
    const start_amount = req.body.start_amount;
    const end_amount = req.body.end_amount;

    const { data, error } = await supabase
        .from('past_conversions')
        .insert({
        user_username: user_username,
        start_currency: start_currency,
        end_currency: end_currency,
        start_amount: start_amount,
        end_amount: end_amount
        })
        .select();

    if (error) {
        console.log('Error:', error);
        res.send(error);
    } else {
        console.log('Successfully Added Data');
        res.send(data);
    }
});

app.get('/credentials', async (req, res) => {
    console.log('Attempting to get all rows.');

    const { data, error } = await supabase.from('credentials').select();

    if (error) {
        console.log('Error:', error);
        res.send(error);
    } else {
        console.log('Successfully Retrieved User');
        res.send(data);
    }
});

app.listen(port, () => {
    console.log('Running');
});