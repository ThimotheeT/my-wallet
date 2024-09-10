import React from "react";

const Registration = () => {
  return (
    <div>
      <h1>Registration</h1>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Password" />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Registration;
