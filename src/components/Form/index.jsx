import "./Form.css";
import FormInput from "../FormInput";

function FormControl({ handleData, data, handleComplete }) {
  const { isGoingToContinue, setIsGoingToContinue } = handleComplete;
  const completeIcon = "./images/icon-complete.svg";

  const handleCardDisplay = (card) => {
    const rawText = [...card.split(" ").join("")];
    const creditCard = [];
    rawText.forEach((t, i) => {
      if (i % 4 === 0) creditCard.push(" ");
      creditCard.push(t);
    });
    return creditCard.join("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.type === "submit") setIsGoingToContinue(true);
    if (isGoingToContinue) setIsGoingToContinue(false);
  };

  const handleChange = (target) => {
    let { name, value } = target;
    value = name == "number" ? value.split(" ").join("") : value;
    handleData((prev) => ({ ...prev, [name]: value }));
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
      pattern: "[0-9 ]{20,20}",
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
      value: data.cvc.slice(0, 3),
      type: "number",
      name: "cvc",
      id: "cvc",
      placeholder: "e.g. 123",
      required: true,
      max: "999",
      min: "100",
    },
  };

  return (
    <form className="forms" onSubmit={(e) => handleSubmit(e)}>
      {isGoingToContinue ? (
        <div className="form__complete">
          <img src={completeIcon} alt="" />
          <h2>thank you</h2>
          <p>we've added your card details</p>
        </div>
      ) : (
        <>
          <div className="form__input">
            <label htmlFor="name">cardholder name</label>
            <FormInput callbackChange={handleChange} attrs={inputs.name} />
            <span>
              {data.name.split("").every((x) => Number.isInteger(x))
                ? "Can't be blank"
                : "Name can't have numbers"}
            </span>
          </div>
          <div className="form__input">
            <label htmlFor="number">card number</label>
            <FormInput callbackChange={handleChange} attrs={inputs.number} />
            <span>
              {data.number.length > 16 ||
              !data.number.split("").every((x) => Number.isInteger(x))
                ? "no letters and be 16 characters"
                : "can't be blank"}
            </span>
          </div>
          <div className="forms__detail">
            <div className="form__input">
              <label htmlFor="name">exp. date (mm/yy)</label>
              <div>
                <FormInput callbackChange={handleChange} attrs={inputs.month} />
                <FormInput callbackChange={handleChange} attrs={inputs.year} />
                <span>
                  {data.month > 12 ? "incorrect date" : "Can't be blank"}
                </span>
              </div>
            </div>
            <div className="form__input">
              <label htmlFor="cvc">CVC</label>
              <FormInput callbackChange={handleChange} attrs={inputs.cvc} />
              <span>
                {data.cvc.length < 3
                  ? "cvc format incorrect"
                  : "Can't be blank"}
              </span>
            </div>
          </div>
        </>
      )}
      <button className="form-button purple gray-onhover">
        {isGoingToContinue ? "Continue" : "Confirm"}
      </button>
    </form>
  );
}

export default FormControl;
