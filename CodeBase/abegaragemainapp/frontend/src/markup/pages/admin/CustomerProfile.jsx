import React from "react";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomerDetails from "../CustomerProfile";

function CustomerProfile(props) {
  return (
    <div>
      <div className="container-fluid admin pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
