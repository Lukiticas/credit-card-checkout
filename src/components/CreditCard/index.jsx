import "./CreditCard.css";

function CreditCard({ name, number, date, cvc, side }) {
  const cardLogo = "./images/card-logo.svg";
  const isSide = side ? "back" : "front";
  const background = side
    ? "./images/bg-card-back.png"
    : "./images/bg-card-front.png";

  return (
    <div
      className={`card ${isSide}`}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {side ? (
        <div className="wrapper">
          <h1 className="cvc">{cvc}</h1>
        </div>
      ) : (
        <>
          <img src={cardLogo} alt="card icon" />
          <section className="card__details">
            <h1 className="details__number">
              {number.split("").map((e, index) => (
                <span key={index}>{e}</span>
              ))}
            </h1>
            <footer>
              <h1>{name}</h1>
              <small>
                {date.month}/{date.year}
              </small>
            </footer>
          </section>
        </>
      )}
    </div>
  );
}

export default CreditCard;
