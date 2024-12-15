document.body.style.color = "red";

function PopulateForm() {
    const productSelect = document.getElementById("fromCurrency");
    const productSelect1 = document.getElementById("toCurrency");
    document.body.style.backgroundColor = "gray";
    document.body.style.color = "black";
    fetch("https://v6.exchangerate-api.com/v6/931338a7448949440c943139/latest/USD")
    .then((res) => res.json())
    .then((resJson) => {
        console.log('Response JSON:', resJson);
        Object.entries(resJson.conversion_rates).forEach(([key, value]) => {
            console.log("Currency:", key, value);
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = key;
            option1.innerHTML = key; 
            option2.value = key;
            option2.innerHTML = key; 
            productSelect.appendChild(option1);
            productSelect1.appendChild(option2);
        });
    });
}

function convert() {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const numberToConvert = document.getElementById("numberToConvert").value;
    
    if (fromCurrency === toCurrency) {
        alert('You cannot convert to and from the same currency!');
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/931338a7448949440c943139/latest/${fromCurrency}`)
    .then((resp) => resp.json())
    .then((data) => {
        const convertedAmount = (numberToConvert * data.conversion_rates[toCurrency]).toFixed(2);
        const result = `${numberToConvert} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
        document.getElementById("result").innerText = result;
    });
}

window.onload = PopulateForm;
