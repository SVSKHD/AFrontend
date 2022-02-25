import { Link } from "react-router-dom";
import Dashboard from "../../Components/Layout/dashboard";
import {FaArrowRight} from "react-icons/fa"

const userDashboard = (props) => {
  const userMenu = [
    {
      name:"Orders",
      description:"See Your Orders here",
      path:"/user/dashboard"
    },
    {
      name:"Wish-List",
      description:"See Your Favourite Products here",
      path:"/user/wish-list"
    },
    {
     name:"Address",
     description:"Change Your Address here",
     path:"/user/address"
    },
    {
      name:"Change-Password",
      description:"Change Your Password here",
      path:"/user/change-password"
    },
    {
     name:"Contact-Us",
     description:"You Can Contact Here",
     path:"/user/contactus"
    }
  ]
  return (
    <>
      <Dashboard className="Dashboard" title="Dashboard">
        <div className="row">
          {userMenu.map((m,i)=>(
            <div className="col-md-4 col-sm-12 col-lg-4 mb-2">
            <Link className="dashboardcard" to={m.path}>
            <div className="card shadow-lg p-3" style={{borderRadius:'0rem', height:'300px'}}>
              <div className="card-body">
                <h5 className="dashboardcardtitle">
                  {m.name}
                </h5>
                <p className="dashboardcontent">
                  See Your Orders here 
                </p>
                <div className="p-4">
                <div className="dashboardalign">
                <button className="btn btn-link"><FaArrowRight size={25}/></button>
                </div>
                </div>
              </div>
            </div>
            </Link>
          </div>
          ))}
        </div>
      </Dashboard>
    </>
  );
};
export default userDashboard;
