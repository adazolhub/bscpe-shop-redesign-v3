import { UserAuth } from "../../lib/Auth";
import ProductCard from "./ProductCard";

const TwoColumn = ({ category, addToCart }) => {
  const { list: data } = UserAuth();
  return (
    <>
      <div className="grid grid-cols-2 row-start-1 row-end-4 gap-2 px-2 mb-6 grid-flow-dense sm:grid-cols-3 xl:grid-cols-4 place-items-center">
        {data &&
          data
            ?.filter((prod) => prod.product_category === category)
            .map((product) => (
              <ProductCard
                key={product.product_id}
                product_id={product.product_id}
                name={product.product_name}
                image={product.product_image}
                price={product.product_price}
              />
            ))}
      </div>
    </>
  );
};

export default TwoColumn;
