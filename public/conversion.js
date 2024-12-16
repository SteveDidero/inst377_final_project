const host = window.location.origin;

async function addEntry(baseCurrency, desiredCurrency, userAmount, convertedAmount) {
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
  }).then((res) => res.json());
}

async function loadEntries() {
  if (sessionStorage.getItem("loggedIn") == 'true') {
    await fetch(`${host}/past_conversions`)
      .then((res) => res.json())
      .then((resJson) => {
        const table = document.createElement('table');
        table.setAttribute('class', 'styled-table');
        table.setAttribute('id', 'conversionInfo');
  
        const tableRow = document.createElement('tr');

        const tableHeading1 = document.createElement('th');
        tableHeading1.innerHTML = 'Start Currency';
        tableRow.appendChild(tableHeading1);
  
        const tableHeading2 = document.createElement('th');
        tableHeading2.innerHTML = 'End Currency';
        tableRow.appendChild(tableHeading2);
  
        const tableHeading3 = document.createElement('th');
        tableHeading3.innerHTML = 'Start Amount';
        tableRow.appendChild(tableHeading3);

        const tableHeading4 = document.createElement('th');
        tableHeading4.innerHTML = 'End Amount';
        tableRow.appendChild(tableHeading4);
  
        table.appendChild(tableRow);
        
        currentUsername = sessionStorage.getItem('user')
        resJson.forEach((entry) => {
          if (entry.user_username === currentUsername) {
            const entryTableRow = document.createElement('tr');
            const entryStartCurrency = document.createElement('td');
            const entryEndCurrency = document.createElement('td');
            const entryStartAmount = document.createElement('td');
            const entryEndAmount = document.createElement('td');
        
            entryStartCurrency.innerHTML = entry.start_currency;
            entryEndCurrency.innerHTML = entry.end_currency;
            entryStartAmount.innerHTML = entry.start_amount;
            entryEndAmount.innerHTML = entry.end_amount;

            entryTableRow.appendChild(entryStartCurrency);
            entryTableRow.appendChild(entryEndCurrency);
            entryTableRow.appendChild(entryStartAmount);
            entryTableRow.appendChild(entryEndAmount);
  
            table.appendChild(entryTableRow);
          }
        });
  
        const preExistingTable = document.getElementById('conversionInfo');
        if (preExistingTable) {
          preExistingTable.remove();
        }
  
        document.body.appendChild(table);
      });
  } else {
    alert("You must create an account or login to view conversion history.")
  }
}

function countryOptions() {
    fetch(`https://www.ipqualityscore.com/api/json/country/list`)
    .then((res) => res.json())
        .then(data => {
            Object.entries(data.countries).forEach(([code, item]) => {
                const currencyId = item;
                const option = document.createElement("option");
                const select = document.getElementById("country-select");
                option.innerHTML = currencyId;
                option.value = code;
                select.appendChild(option);
            })
        })
}

function getUserExchange(event) {
    event.preventDefault();
    baseCurrency = document.getElementById("base-currency").value;
    userAmount = document.getElementById("base-amount").value;
    userCountry = document.getElementById("country-select").value;
    desiredCurrency = countryToCurrency[userCountry];
    let converted_amount;
    fetch(`https://v6.exchangerate-api.com/v6/4b93a5f68203d9339b90fe80/pair/${baseCurrency}/${desiredCurrency}/${userAmount}`)
    .then((res) => res.json())
        .then(data => {
            const conversion_rate = data.conversion_rate;
            converted_amount = data.conversion_result;
            const sentence = document.getElementById('conversion_results');
            sentence.innerHTML = ""
            sentence.innerHTML = `${userAmount} ${baseCurrency} is equal to ${converted_amount} ${desiredCurrency}.\nYour conversion rate is ${conversion_rate}.`;

            addEntry(baseCurrency, desiredCurrency, userAmount, converted_amount);
        })
}

async function loadSite() {
    countryOptions();
    console.log(sessionStorage.getItem('user'));
    console.log(sessionStorage.getItem('loggedIn'));
    if (sessionStorage.getItem("loggedIn") == 'true') {
        document.getElementById("user-greeting").innerHTML = `Welcome, ${sessionStorage.getItem('user')}`
    } else {
        document.getElementById("user-greeting").innerHTML = `You are currently not logged in. Any conversions made will not save.`
    }
}

window.onload = loadSite;