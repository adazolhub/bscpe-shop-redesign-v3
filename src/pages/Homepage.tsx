import {

  useRoutes,

} from "react-router-dom";
import { suspend } from "suspend-react";
import Footer from "../components/Core/Footer";
import { routes } from "../routes/RouterMain";
import { getInitialAuthState } from "../utils/lib/AuthState";



const HomePage = () => {
  let element = useRoutes(routes);
  suspend<any,any>(getInitialAuthState, "initialUserState" );

  return (
    <>
      <>
        <main className="relative top-0 h-full">
          {element}
          {/* <CartWrapper /> */}
        </main>

        <Footer />
      </>
    </>
  );
};

export default HomePage;