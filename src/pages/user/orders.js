import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserOrders } from "../../Components/functions/user";
import Dashboard from "../../Components/Layout/dashboard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../Components/orders/Invoice";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    LoadUserOrders();
  }, []);

  const LoadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="AquaInvoice.pdf"
      className="btn btn-theme"
    >
      Download Invoice
    </PDFDownloadLink>
  );

  const showOrderInCard = (order) => (
    <>
      <div className="row">
        {order.products.map((p, i) => (
          <div key={i} className="col-md-6">
            <div className="card mb-2 text-dark" style={{borderRadius:'0rem'}}>
              <div className="card-body">
                <p>
                  Product - Name : <b>{p.product.title}</b>
                </p>
                <p>
                  Product - Brand : <b>{p.product.brand}</b>
                </p>
                <p>
                  Price Purchased at : <b>{p.product.price}</b>
                </p>
                <p>
                  Product Count : <b>{p.count}</b>
                </p>
                <p>
                  Product-Color : <b>{p.color}</b>
                </p>
                <p>
                  Product-Currency : <b className="text-success">"INR"</b>
                </p>
                <hr />
                {showDownloadLink(order)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const showEachOrder = () =>
    orders.map((order, i) => (
      <>
        <div key={i}>
          <h3>Order Summary</h3>
          <hr />
          <div className="row">
            <div className="col">{showOrderInCard(order)}</div>
          </div>
        </div>
      </>
    ));
  return (
    <Dashboard title="Your Orders">
      <div className="row">{showEachOrder()}</div>
    </Dashboard>
  );
};
export default UserOrders;
