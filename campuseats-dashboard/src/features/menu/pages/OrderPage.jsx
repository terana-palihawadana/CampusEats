import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL } from "../../../config";

function OrderPage() {
  const [searchParams] = useSearchParams();
  const preselectedDish = searchParams.get("dish") || "";

  const { data: dishes, isLoading, error } = useFetch(MENU_URL);
  const [form, setForm] = useState({
    dishId: preselectedDish,
    name: "",
    email: "",
    qty: 1,
  });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const availableDishes = (dishes ?? []).filter((d) => d.available);
  const selectedDish = availableDishes.find(
    (d) => String(d.id) === String(form.dishId)
  );
  const total =
    selectedDish && Number(form.qty) > 0
      ? selectedDish.price * Number(form.qty)
      : 0;

  function validate(v) {
    const e = {};
    if (!v.dishId) e.dishId = "Please select a dish";
    if (!v.name || v.name.trim().length < 2) {
      e.name = "Name must be at least 2 characters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      e.email = "Enter a valid email";
    }
    if (Number(v.qty) < 1) {
      e.qty = "Quantity must be at least 1";
    }
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eMap = validate(form);
    setErrors(eMap);
    if (Object.keys(eMap).length === 0) setDone(true);
  }

  if (isLoading) {
    return (
      <p className="status-message status-message--loading">Loading menu...</p>
    );
  }

  if (error) {
    return (
      <p className="status-message status-message--error">
        Could not load dishes: {error}
      </p>
    );
  }

  if (done && selectedDish) {
    return (
      <div className="success-card">
        <h2>Order received</h2>
        <p>
          Thanks, <strong>{form.name}</strong>! Your order for{" "}
          <strong>
            {form.qty} × {selectedDish.name}
          </strong>{" "}
          (Rs. {total.toFixed(2)}) has been received.
        </p>
        <div className="detail-actions">
          <Link className="back-link" to="/">
            ← Back to menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">Place Order</h2>
      <p className="page-subtitle">
        Choose a dish from the menu and submit your order details.
      </p>

      <form className="order-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="dishId">Dish</label>
          <select
            id="dishId"
            name="dishId"
            value={form.dishId}
            onChange={handleChange}
          >
            <option value="">Select a dish...</option>
            {availableDishes.map((dish) => (
              <option key={dish.id} value={dish.id}>
                {dish.name} — Rs. {dish.price.toFixed(2)}
              </option>
            ))}
          </select>
          {errors.dishId && <span className="field-error">{errors.dishId}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@campus.edu"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="qty">Quantity</label>
          <input
            id="qty"
            name="qty"
            type="number"
            min="1"
            value={form.qty}
            onChange={handleChange}
          />
          {errors.qty && <span className="field-error">{errors.qty}</span>}
        </div>

        {selectedDish && (
          <p className="order-total">
            Total: <strong>Rs. {total.toFixed(2)}</strong>
          </p>
        )}

        <button className="btn" type="submit">
          Place order
        </button>
      </form>
    </div>
  );
}

export default OrderPage;
