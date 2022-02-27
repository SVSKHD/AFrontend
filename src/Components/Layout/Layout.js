import Footer from "./Footer";
import Nav from "./Nav";

const Layout = (props) => {
  return (
    <>
      <Nav />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
export default Layout;
