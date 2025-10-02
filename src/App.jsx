import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Cargar productos
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  // Filtrar productos
  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === "Todos" || prod.category === selectedCategory;
    const matchesSearch = prod.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // --- CARRITO ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, qty: Math.max(item.qty + delta, 1) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      <Navbar
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
        cartCount={cartCount}
        onCartToggle={() => setShowCart(!showCart)}
      />
      <Banner />
      <ProductList products={filteredProducts} onAddToCart={addToCart} />
      {showCart && (
        <Cart
          cartItems={cart}
          onRemove={removeFromCart}
          onChangeQty={changeQty}
          total={cartTotal}
        />
      )}
      <Footer />
    </>
  );
}

export default App;
