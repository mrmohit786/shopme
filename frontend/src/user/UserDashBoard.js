import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { updateUser } from "./helper/userapicalls";

const UserDashboard = () => {
  const {
    user: { name, email, role, _id },
    token, //user contain further values
  } = isAuthenticated(); //isAuthenticate return user
  console.log(_id);
  console.log(token);
  const title = `Welcome ${name}`;

  const editUser = { name: "MohitPatel" };
  const jsondata = JSON.stringify(editUser);
  console.log(updateUser(_id, token, jsondata));
  return (
    <Base title={title} description="Here you can manage your account">
      <div>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
      </div>
    </Base>
  );
};

export default UserDashboard;
