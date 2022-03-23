import { useState } from "react";
import LatestTen from "./LatestTen";

function Currency({
  currency,
  url,
  valuteLatestTenDays,
  setLatestValute,
}) {
  const [latestTen, setLatestTen] = useState([]);
  const [loading, setLoading] = useState(false);
  const percent = currency.Value * (currency.Value - currency.Previous) / 100;

  function toggleTooltip(event) {
    const tooltip = event.currentTarget.lastChild;
    const x = event.clientX;
    const y = event.clientY;
  
    tooltip.style.top = `${(y + 20)}px`;
    tooltip.style.left = `${(x + 20)}px`;
  };

  function delay() {
    return new Promise(resolve => setTimeout(resolve, 200));
  }

  async function getLatestTen() {
    if (latestTen.length) {
      setLatestTen([]);
    } else if (valuteLatestTenDays.length) {
      const arr = [];

      valuteLatestTenDays.forEach((valute) =>
        arr.push({
          ...valute[currency.CharCode],
          date: valute.date.split('T')[0],
        })
      );

      setLatestTen(arr);
    } else {
      const arr = [];
      const arr2 = [];
      
      let currentUrl = url;
      setLoading(true);

      for (let i = 0; i < 9; i++) {
        const response = await fetch(currentUrl);
        const data = await response.json();
        currentUrl = data.PreviousURL;

        await delay();

        arr.push({ ...data.Valute, date: data.Date });
        arr2.push({
          ...data.Valute[currency.CharCode],
          date: data.Date.split('T')[0],
        });
      }

      setLatestValute(arr);
      setLatestTen(arr2);
      setLoading(false);
    }
  }

  return (
    <>
      <ul
        className="valute-container"
        onMouseMove={toggleTooltip}
        onClick={getLatestTen}
      >
        <li>{currency.CharCode}</li>
        <li>{(currency.Value / currency.Nominal).toFixed(4)}</li>
        <li>
          {`${percent.toFixed(2)}%`}
        </li>
        <li>{currency.Name}</li>
      </ul>
      {latestTen.length > 0 
        ? latestTen.map((currency, index) =>
            <LatestTen
              currency={currency}
              key={index}
              toggleTooltip={toggleTooltip}
            />
          )
        : null}
        {loading 
          ? <h2 style={{ textAlign: 'center' }}>
              Загрузка...
            </h2>
          : null}
    </>
  );
}

export default Currency;
