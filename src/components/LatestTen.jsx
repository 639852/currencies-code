function LatestTen({ currency, toggleTooltip }) {
  const percent = currency.Value * (currency.Value - currency.Previous) / 100;

  return (
    <ul className="valute-additional" onMouseMove={toggleTooltip}>
      <li>{currency.CharCode}</li>
      <li>{(currency.Value / currency.Nominal).toFixed(4)}</li>
      <li>{`${percent.toFixed(2)}%`}</li>
      <li>{currency.date}</li>
    </ul>
  );
}

export default LatestTen;
