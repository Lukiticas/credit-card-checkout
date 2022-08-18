import "./styles/App.css";
import CreditCard from "./components/CreditCard";
import FormControl from "./components/Form";
import { useState } from "react";

function App() {
  const [isGoingToContinue, setIsGoingToContinue] = useState(false);
  const [formInfo, setFormInfo] = useState({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  return (
    <main className="app">
      <picture>
        <source
          srcSet="./images/bg-main-mobile.png"
          media="(max-width: 800px)"
        />
        <img src="./images/bg-main-desktop.png" alt="background" />
      </picture>
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
        <FormControl
          handleData={setFormInfo}
          data={formInfo}
          handleComplete={{
            isGoingToContinue: isGoingToContinue,
            setIsGoingToContinue: setIsGoingToContinue,
          }}
        />
      </section>
    </main>
  );
}

export default App;
