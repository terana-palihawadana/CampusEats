import { Link } from "react-router-dom";

function DishCard({ dish }) {
  return (
    <Link to={`/dish/${dish.id}`} className="dish-card">
      <h3>{dish.name}</h3>
      <p className="dish-card__price">Rs. {dish.price.toFixed(2)}</p>
      <div className="dish-card__meta">
        <small>{dish.category}</small>
        {!dish.available && <span className="sold-out">Sold out</span>}
      </div>
    </Link>
  );
}

export default DishCard;
