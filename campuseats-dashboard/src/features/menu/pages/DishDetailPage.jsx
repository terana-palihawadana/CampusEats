import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL } from "../../../config";

function DishDetailPage() {
  const { id } = useParams();
  const { data: dishes, isLoading, error } = useFetch(MENU_URL);

  if (isLoading) {
    return <p className="status-message status-message--loading">Loading dish...</p>;
  }

  if (error) {
    return (
      <p className="status-message status-message--error">
        Could not load dish: {error}
      </p>
    );
  }

  const dish = (dishes ?? []).find((d) => String(d.id) === String(id));

  if (!dish) {
    return (
      <div className="detail-card">
        <h2>Dish not found</h2>
        <p>No dish with id #{id} exists on the menu.</p>
        <div className="detail-actions">
          <Link className="back-link" to="/">
            ← Back to menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-card">
      <p className="page-subtitle">Dish #{dish.id}</p>
      <h2>{dish.name}</h2>
      <p className="detail-card__price">Rs. {dish.price.toFixed(2)}</p>
      <div className="dish-card__meta">
        <small>{dish.category}</small>
        {!dish.available && <span className="sold-out">Sold out</span>}
        {dish.available && <small>Available</small>}
      </div>
      <div className="detail-actions">
        <Link className="back-link" to="/">
          ← Back to menu
        </Link>
        {dish.available && (
          <Link className="btn" to={`/order?dish=${dish.id}`}>
            Place order
          </Link>
        )}
      </div>
    </div>
  );
}

export default DishDetailPage;
