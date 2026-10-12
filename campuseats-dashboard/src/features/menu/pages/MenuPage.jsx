import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";
import { MENU_URL } from "../../../config";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);
  const { data: dishes, isLoading, error } = useFetch(MENU_URL);

  if (isLoading) {
    return <p className="status-message status-message--loading">Loading menu...</p>;
  }

  if (error) {
    return (
      <p className="status-message status-message--error">
        Could not load menu: {error}
      </p>
    );
  }

  const filtered = (dishes ?? []).filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <div>
      <h2 className="page-title">Menu</h2>
      <p className="page-subtitle">Browse campus dishes and tap a card for details.</p>
      <input
        className="search-bar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search dishes..."
        aria-label="Search dishes"
      />
      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;
