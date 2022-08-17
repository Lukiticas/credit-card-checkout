import "./styles/App.css";
import CreditCard from "./components/CreditCard";
import { useState, useEffect } from "react";
import FormControl from "./components/FormControl";
function App() {
  const [formInfo, setFormInfo] = useState({
    name: "",
    number: "",
    date: {
      month: "",
      year: "",
    },
    cvc: "",
  });

  return (
    <div className="app">
      <aside className="card-wrapper">
        <CreditCard
          name={formInfo.name ? formInfo.name : "Jane Appleseed"}
          number={formInfo.number ? formInfo.number : "2123212321232123"}
          date={{
            month: formInfo.date.month ? formInfo.date.month : "12",
            year: formInfo.date.year ? formInfo.date.year : "12",
          }}
          side={false}
        />
        <CreditCard cvc={formInfo.cvc ? formInfo.cvc : "123"} side={true} />
      </aside>
      <FormControl handleData={setFormInfo} data={formInfo} />
    </div>
  );
}

export default App;
