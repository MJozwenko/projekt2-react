const url = "https://api.nbp.pl/api/exchangerates/tables/c/";

const fetchCurrencies = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data[0].rates.filter(
    (currency) =>
      currency.code === "EUR" ||
      currency.code === "USD" ||
      currency.code === "CHF"
  );
};

export { fetchCurrencies };
