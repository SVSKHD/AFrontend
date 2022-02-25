import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WishListCard from "../../Components/cards/wishlistCard";
import { getWishlist, removeWishlist } from "../../Components/functions/user";
import Dashboard from "../../Components/Layout/dashboard";
import { Spinner } from "reactstrap";

const UserWishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(user.token)
      .then((res) => {
        setLoading(true);
        setWishlist(res.data.wishlist);
      })
      .then(() => {
        setLoading(false);
      });
  };
  const handleRemove = (productId) =>
    removeWishlist(productId, user.token).then((res) => {
      loadWishlist();
    });

  return (
    <Dashboard title="Wishlist">
      <div>
        {loading ? (
          <Spinner className="text-center">Loading...</Spinner>
        ) : (
          <div className="row">
            {wishlist.map((p, i) => (
              <div key={i} className="col-md-4">
                <WishListCard
                  handleRemove={() => handleRemove(p._id)}
                  link={`/product/${p.slug}`}
                  name={p.title}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Dashboard>
  );
};
export default UserWishList;
