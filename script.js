const apiKey = "7cfe4d32e51778a08f0b3737";  
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// Fetch currency codes 
async function loadCurrencies() {
  const res = await fetch(apiUrl);
  const data = await res.json();
  const currencies = Object.keys(data.conversion_rates);

  currencies.forEach(code => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = code;
    option1.textContent = option2.textContent = code;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = "USD";
  toCurrency.value = "INR";
}

document.getElementById("convert").addEventListener("click", async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = amount.value;

  if (amt === "" || amt <= 0) {
    result.textContent = "Enter a valid amount!";
    return;
  }

  const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
  const data = await response.json();
  const rate = data.conversion_rates[to];
  const converted = (amt * rate).toFixed(2);

  result.textContent = `${amt} ${from} = ${converted} ${to}`;
});

loadCurrencies();
