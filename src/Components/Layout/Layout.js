import Footer from "./Footer";
import Nav from "./Nav";

const Layout = (props) => {
  return (
    <>
      <Nav />
      <br/>
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
export default Layout;
