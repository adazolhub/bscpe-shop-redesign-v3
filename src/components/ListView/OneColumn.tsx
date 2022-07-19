
import { UserAuth } from "../../utils/lib/Auth";
import ProductCardSecondary from "./ProductCardSecondary";


//TODOS : need to fix their types > temporarity set to (any)
const OneColumn = ({ category, addToCart } : any) => {
  const { list: data } : any = UserAuth();
  return (
    <>
      <div className="grid grid-cols-1 row-start-1 row-end-4 gap-4 px-2 mb-6 grid-flow-dense md:grid-cols-2 xl:grid-cols-3 place-items-center ">
        {data &&
          data
            ?.filter((prod : any) => prod.product_category === category)
            .map((product : any, index: number) => (
              <ProductCardSecondary
                key={product?.product_id}
                product_id={product?.product_id}
                name={product?.product_name}
                description={product?.product_description}
                image={product?.product_image}
                price={product?.product_price}
              />
            ))}
      </div>
    </>
  );
};

export default OneColumn;
