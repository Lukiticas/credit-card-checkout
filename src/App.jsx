import "./styles/App.css";
import CreditCard from "./components/CreditCard";

function App() {
  const expireDate = {
    month: 12,
    year: 14,
  };
  return (
    <div className="app">
      <CreditCard
        name="Lucas Matheus"
        number="1234567891011135"
        date={expireDate}
        cvc="123"
        side={false}
      />
      <CreditCard cvc="123" side={true} />
    </div>
  );
}

export default App;
