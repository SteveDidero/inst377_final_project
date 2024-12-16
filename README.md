# INST377 Group Project: Currency Conversion Website
* Group Members: Steve Tanekeu, Valerie Mendoza, Roman Lakner, Grace Yang
* Project Title: Exchango!
* Project Description: Exchango! is an application that makes currency conversion simple. We utilize the ExchangeRate-API to convert 161 different currencies used around the world to help make the process of preparing for international vacation easier. So often, the general public or even tourists make wrong calculations about their spending when traveling to a new location only to find out later that they can’t participate in some of the activities that they planned or do some things that require money because they didn’t know how much to bring. To combat this, we used the API to create a user-friendly website that assists in currency conversion.
* Target Browsers Descrption: Our website pages are best designed for desktop Google Chrome users. The application will still be functional on other browsers such as Microsoft Edge or Mozilla Firefox, however mobile users may not see the screen as intended.
* For the Vercel link, please enable CORS and disable any ad-blocker.

---

## Developer Manual
### Installation

1. Clone the repository on your local directory:
```
git clone https://github.com/SteveDidero/inst377_final_project.git
```
2. Open the project directory
```
cd ./inst377_final_project.git
```
3. Install node.js.
```
https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/
```
4. Install all necessary dependencies in the terminal (express.js, nodemon, react.js, supabase)
```
npm install express
```
```
npm install nodemon
```
```
npm install react react-dom
```
```
npm install @supabase/supabase-js
```
### Running the Server
1. To run the application on a server, enter the command below:
```
npm start
```
2. To verify the server is running successfully, check the terminal for a message saying "Running"

3. To access the local instance of the server, go to http://localhost:3000.

4. To stop the server, use the CTRL + C combination in your terminal.

### API Information
#### ExchangeRate-API
1. Conversion Page (/public/conversion.js)
* Uses GET to fetch a pair conversion for two different currencies, returning the final amount as well as the conversion rate.
```javascript
GET /${API_URL}
fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCurrency}/${desiredCurrency}/${userAmount}`)
```

#### IPQualityScore API
1. Conversion Page (/public/conversion.js)
* Uses GET to fetch the list of country names as well as their codes to later be translated to currency codes.
```javascript
GET /${API_URL}
fetch(`https://www.ipqualityscore.com/api/json/country/list`)
```

#### Supabase
1. Conversion Page (/public/conversion.js)
* Uses POST to update the 'past_conversions' table with conversions made by the user to be stored and later retrieved.
```javascript
POST /past_conversions
await fetch(`${host}/past_conversions`, {
    method: 'POST',
    body: JSON.stringify({
      user_username: sessionStorage.getItem('user'),
      start_currency: baseCurrency,
      end_currency: desiredCurrency,
      start_amount: userAmount,
      end_amount: convertedAmount,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
```
* Uses GET to fetch the 'past_conversions' table to retrieve the conversion history made by the user.
```javascript
GET /past_conversions
fetch(`${host}/past_conversions`)
```

2. Login Page (/public/login.js)
* Uses POST to update the 'credentials' table with a newly created account by the user.
```javascript
POST /credentials
await fetch(`${host}/credentials`, {
      method: 'POST',
      body: JSON.stringify({
        user_username: username,
        user_password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
```
* Uses GET to fetch the 'credentials' table to retrieve the list of usernames and passwords to authenticate the user.
```javascript
GET /credentials
fetch(`${host}/credentials`)
```

### Future Development
* To improve the user experience, we want to implement a feature that will display the best times to go on vacation based on historical data of currency conversion rates for the desired country. This could be implemented using 'Historical Data' endpoints from the ExchangeRate-API, and use a JavaScript library like Chart.js to visualize the trends to show the yearly peaks of a certain currency's conversion rate.