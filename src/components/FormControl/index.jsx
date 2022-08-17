import "./FormControl.css";
import FormInput from "../FormInput";

function FormControl({ handleData, data }) {
  const handleCardDisplay = (card) => {
    const rawText = [...card.split(" ").join("")]; // Remove old space
    const creditCard = []; // Create card as array
    rawText.forEach((t, i) => {
      if (i % 4 === 0) creditCard.push(" "); // Add space
      creditCard.push(t);
    });
    return creditCard.join("");
  };

  const inputs = {
    name: {
      name: "name",
      value: data.name,
      type: "text",
      id: "name",
      placeholder: "e.g. Jane Appleseed",
      required: true,
      pattern: "^[ a-zA-Z ]*$",
    },
    number: {
      value: handleCardDisplay(data.number),
      type: "text",
      name: "number",
      id: "number",
      placeholder: "e.g. 1234 5678 9101 1213",
      required: true,
      pattern: "[0-9 ]{0,20}",
    },
    month: {
      value: data.month.slice(0, 2),
      type: "number",
      name: "month",
      id: "month",
      placeholder: "MM",
      required: true,
      min: "1",
      max: "12",
    },
    year: {
      value: data.year.slice(0, 2),
      type: "number",
      name: "year",
      id: "year",
      placeholder: "YY",
      required: true,
    },
    cvc: {
      value: data.cvc,
      type: "number",
      name: "cvc",
      id: "cvc",
      placeholder: "e.g. 123",
      required: true,
      max: "999",
      min: "100",
    },
  };

  const handleChange = (target) => {
    let { name, value } = target;
    value = name == "number" ? value.split(" ").join("") : value;
    handleData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="forms">
      <div className="form__input">
        <label htmlFor="name">name</label>
        <FormInput callbackChange={handleChange} attrs={inputs.name} />

        <span>this can't be blank/have numbers</span>
      </div>

      <div className="form__input">
        <label htmlFor="number">number</label>
        <FormInput callbackChange={handleChange} attrs={inputs.number} />
        <span>Wrong Format, only numbers/max of 16</span>
      </div>

      <section className="forms__detail">
        <div className="form__input">
          <label htmlFor="name">exp. date (mm/yy)</label>
          <div>
            <FormInput callbackChange={handleChange} attrs={inputs.month} />
            <FormInput callbackChange={handleChange} attrs={inputs.year} />

            <span>Can't be blank</span>
          </div>
        </div>
        <div className="form__input">
          <label htmlFor="cvc">CVC</label>
          <FormInput callbackChange={handleChange} attrs={inputs.cvc} />
          <span>Can't be blank / max of 3</span>
        </div>
      </section>
      <button className="form-button purple gray-onhover">Confirm</button>
    </form>
  );
}

export default FormControl;
