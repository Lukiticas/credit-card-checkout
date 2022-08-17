import "./styles/App.css";
import CreditCard from "./components/CreditCard";
import { useState, useEffect } from "react";
import FormControl from "./components/FormControl";
function App() {
  const [formInfo, setFormInfo] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  return (
    <main className="app">
      <div className="aside-image">
        <picture>
          <source
            srcSet="./images/bg-main-mobile.png"
            media="(max-width:  900px)"
          />
          <img src="./images/bg-main-desktop.png" alt="background" />
        </picture>
      </div>
      <aside className="card-wrapper">
        <CreditCard
          name={formInfo.name ? formInfo.name : "Jane Appleseed"}
          number={formInfo.number ? formInfo.number : "2123212321232123"}
          date={{
            month: formInfo.month ? formInfo.month : "12",
            year: formInfo.year ? formInfo.year : "12",
          }}
          side={false}
          app
        />
        <CreditCard
          cvc={formInfo.cvc ? formInfo.cvc.slice(0, 3) : "123"}
          side={true}
        />
      </aside>
      <section className="form-wrapper">
        <FormControl handleData={setFormInfo} data={formInfo} />
      </section>
    </main>
  );
}

export default App;
