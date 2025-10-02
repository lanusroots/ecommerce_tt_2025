import { useState } from "react";
import "../styles/navbar.css";

const Navbar = ({
  onSearchChange,
  onCategoryChange,
  selectedCategory,
  cartCount,
  onCartToggle,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchChange(value);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <span className="logo-icon">🎂</span>
        <h1>mis4deseos</h1>
      </div>

      {/* Categorías */}
      <ul className="nav-links">
        {["Todos", "Pastelería Clásica", "Tartas y Tortas", "Muffins y Cupcakes", "Especiales"].map((cat) => (
          <li
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>

      {/* Buscador + carrito */}
      <div className="search-cart">
        <input
          type="text"
          placeholder="Buscador..."
          className="search-input"
          value={searchInput}
          onChange={handleSearch}
        />

        <div className="cart" onClick={onCartToggle}>
          🛒
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
