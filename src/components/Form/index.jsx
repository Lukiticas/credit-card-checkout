import "./Form.css";
import FormInput from "../FormInput";
import { useState } from "react";

function FormControl({ handleData, data }) {
  const [onError, setOnError] = useState(false);
  const [isGoingToContinue, setIsGoingToContinue] = useState(false);

  //icon for the application
  const completeIcon = "./images/icon-complete.svg";

  //current year for date's input validation
  const currentyear = new Date()
    .getFullYear()
    .toString()
    .substring(-2);

  //handle error for shake effect
  const handleError = () => {
    setOnError(true);
    setTimeout(() => {
      setOnError(false);
    }, 100);
  };

  //add a space after 4 digits in the number's input
  const handleCardDisplay = (card) => {
    const rawText = [...card.split(" ").join("")];
    const creditCard = [];
    rawText.forEach((t, i) => {
      if (i % 4 === 0 && i !== 0) creditCard.push(" ");
      creditCard.push(t);
    });
    return creditCard.join("").slice(0, 19);
  };

  /* submit will only have a type, or any value, when all its inputs are correctly filled */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.type === "submit") setIsGoingToContinue(true);
    if (isGoingToContinue) setIsGoingToContinue(false);
  };

  //set state for card's data
  const handleChange = (target) => {
    let { name, value } = target;
    name === "year" && value < currentyear
      ? target.setCustomValidity("Invalid year")
      : target.setCustomValidity("");
    value = name == "number" ? value.split(" ").join("") : value;
    handleData((prev) => ({ ...prev, [name]: value }));
  };

  //list of inputs to be rendered in screen
  const inputs = {
    name: {
      name: "name",
      value: data.name,
      type: "text",
      id: "name",
      placeholder: "e.g. Jane Appleseed",
      required: true,
      pattern: "^[ a-zA-Z ]*$",
      autoComplete: "cc-name",
    },
    number: {
      value: handleCardDisplay(data.number),
      type: "text",
      name: "number",
      id: "number",
      placeholder: "e.g. 1234 5678 9101 1213",
      required: true,
      pattern: "[ 0-9 ]{19}",
      autoComplete: "cc-number",
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
      autoComplete: "cc-exp-month",
    },
    year: {
      value: data.year.slice(0, 2),
      type: "number",
      name: "year",
      id: "year",
      placeholder: "YY",
      required: true,
      autoComplete: "cc-exp-year",
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
      autoComplete: "cc-csc",
    },
  };

  return (
    <form
      className={`forms ${onError ? "shake" : ""}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      {isGoingToContinue ? (
        <div className="form__complete">
          <img src={completeIcon} alt="" />
          <h2>Thank You</h2>
          <p>We've added your card details</p>
        </div>
      ) : (
        <>
          <div className="form__input">
            <label htmlFor="name">cardholder name</label>
            {
              //i had to make a input component because it'd got polluited
            }
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
                ? "No letters and only 16 characters"
                : "Can't be blank"}
            </span>
          </div>
          <div className="forms__detail">
            <div className="form__input">
              <label htmlFor="month">exp. date (mm/yy)</label>
              <div>
                <FormInput callbackChange={handleChange} attrs={inputs.month} />
                <FormInput callbackChange={handleChange} attrs={inputs.year} />
                <span>
                  {
                    //There must be a easier way to do these validations
                  }
                  {data.month > 12 || data.year < currentyear
                    ? `Incorrect date ${
                        data.month > 12 || data.month <= 0 ? "(MM)" : ""
                      } ${data.year < currentyear ? "(YY)" : ""} `
                    : "can't be blank"}
                </span>
              </div>
            </div>
            <div className="form__input">
              <label htmlFor="cvc">CVC</label>
              <FormInput callbackChange={handleChange} attrs={inputs.cvc} />
              <span>
                {data.cvc.length < 3
                  ? "CVC format incorrect"
                  : "Can't be blank"}
              </span>
            </div>
          </div>
        </>
      )}
      <button
        className="form-button purple gray-onhover"
        onClick={() => {
          if (!isGoingToContinue) handleError();
        }}
      >
        {isGoingToContinue ? "Continue" : "Confirm"}
      </button>
    </form>
  );
}

export default FormControl;
