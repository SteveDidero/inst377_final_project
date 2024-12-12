const express = require('express')
const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')

const app = express()
const port = 3000;
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

const supabaseUrl = "https://lgyddipgmtgiaaccuvbj.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxneWRkaXBnbXRnaWFhY2N1dmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMzYxMjIsImV4cCI6MjA0OTYxMjEyMn0.teu3lrjAkzWuytqKT2UWOudX7wXWtDZHM6h7CT7FOpM"
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)


app.get('', async (req, res) => {

    const {data, error} = await supabase
        .from('')
        .select();

    if (error) {
        console.log("Error:", error);
        res.send(error);
    } else {
        console.log('Successfully retrieved data')
        res.send(data);
    }

})

app.post('', async (req, res) => {
    console.log("Attempting to add customer")
    console.log(req.body)

    const {data, error} = await supabase
        .from()
        .insert()
        .select();
})

app.listen(port, () =>{
    console.log("worked")
})