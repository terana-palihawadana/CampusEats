import { Routes, Route, NavLink } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">
          <h1>CampusEats Dashboard</h1>
          <p className="app-header__tagline">Browse, search, and place campus food orders</p>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end>
            Menu
          </NavLink>
          <NavLink to="/order">Place Order</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route
            path="*"
            element={
              <div className="not-found">
                <h2>404 — Page not found</h2>
                <p>That URL doesn’t exist in CampusEats.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
