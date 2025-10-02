import ProductCard from "./ProductCard";
import "../styles/productList.css";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <section className="product-list">
      <h2>Nuestros Productos</h2>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((prod) => (
            <ProductCard key={prod.id} product={prod} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p className="no-results">Producto no encontrado.</p>
        )}
      </div>
    </section>
  );
};

export default ProductList;
