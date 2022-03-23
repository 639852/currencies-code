import { useEffect, useState } from "react";
import "./App.css";
import Currency from "./components/Currency";

function App() {
  const [valute, setValute] = useState([]);
  const [valuteLatestTenDays, setLatestValute] = useState([]);
  const [previousURL, setPreviousURL] = useState('');

  useEffect(() => {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => response.json())
      .then((data) => {
        setValute(Object.values(data.Valute).slice(0, 10));
        setPreviousURL(data.PreviousURL);
      });
  }, []);

  return (
    <>
      <ul className="valute-header">
        <li>Код валюты</li>
        <li>Значение в рублях</li>
        <li>Изменение курса</li>
      </ul>
      {valute.length > 0
        ? valute.map((currency) => 
            <Currency
              key={currency.ID}
              currency={currency}
              url={previousURL}
              valuteLatestTenDays={valuteLatestTenDays}
              setLatestValute={setLatestValute}
            />
          )
        : <h2 style={{textAlign: 'center'}}>
            Валюта не найдена!
          </h2>}
      <a href="https://www.cbr-xml-daily.ru/" className="link">
        API для курсов ЦБ РФ
      </a>
    </>
  );
}

export default App;
