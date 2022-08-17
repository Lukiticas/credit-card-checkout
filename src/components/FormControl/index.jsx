import "./FormControl.css";

function FormControl({ handleData, data, isOnError }) {
  const isComplete = true;

  const handleChange = (target) => {
    let { name, value } = target;
    if (name == "number") {
      if (Number.isInteger(value)) {
        return;
      }
      value = value.slice(0, 16);
    }
    if (["month", "year"].some((x) => x.includes(name))) {
      value = value.slice(0, 2);
    }
    if (name == "cvc") {
      value = value.slice(0, 3);
    }
    handleData((prev) => {
      const newData =
        name == "month" || name == "year"
          ? { ...prev, date: { ...prev.date, [name]: value } }
          : { ...prev, [name]: value };
      return newData;
    });
  };
  return (
    <section className="forms">
      <form>
        <div className="forms__name">
          <label htmlFor="inputName">cardholder name</label>
          <input
            value={data.name}
            onChange={({ target }) => {
              handleChange(target);
            }}
            className=""
            type="text"
            name="name"
            autoComplete="name"
            id="inputName"
            placeholder="e.g Jane Appleseed"
          />
        </div>
        <div className="forms__number">
          <label htmlFor="ccNumber">card number</label>
          <input
            value={data.number}
            onChange={({ target }) => {
              handleChange(target);
            }}
            className=""
            id="ccNumber"
            type="tel"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="0000 0000 0000 0000"
            name="number"
          />
        </div>
        <div className="forms__detail">
          <div className="detail__date">
            <label htmlFor="month">exp. date (mm/yy)</label>
            <div className="detail__wrapper">
              <input
                value={data.date.month}
                onChange={({ target }) => {
                  handleChange(target);
                }}
                className=""
                type="number"
                name="month"
                placeholder="MM"
              />
              <input
                value={data.date.year.slice(0, 2)}
                onChange={({ target }) => {
                  handleChange(target);
                }}
                className=""
                type="number"
                name="year"
                placeholder="YY"
              />
            </div>
          </div>
          <div className="detail__cvc">
            <label htmlFor="cvcNumber">CVC</label>
            <input
              value={data.cvc.slice(0, 3)}
              onChange={({ target }) => {
                handleChange(target);
              }}
              className=""
              type="number"
              name="cvc"
              id="cvcNumber"
              placeholder="e.g. 123"
            />
          </div>
        </div>
        <button>{isComplete ? "Confirm" : "Continue"}</button>
      </form>
    </section>
  );
}

export default FormControl;
