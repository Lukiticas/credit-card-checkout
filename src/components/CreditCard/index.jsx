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
          <h2 className="cvc">{cvc.trim().slice(0, 3)}</h2>
        </div>
      ) : (
        <>
          <img src={cardLogo} alt="" />
          <section className="card__details">
            <h1 className="details__number">
              {number
                .slice(0, 16)
                .split("")
                .map((e, index) => (
                  <span key={index}>{e}</span>
                ))}
            </h1>
            <footer>
              <h1>{name}</h1>
              <small>
                {date.month.slice(0, 2)}/{date.year.slice(0, 2)}
              </small>
            </footer>
          </section>
        </>
      )}
    </div>
  );
}

export default CreditCard;