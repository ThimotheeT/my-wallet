import React from "react";
import Link from 'next/link'

const Welcome = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <Link href="/registration">Registration</Link>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default Welcome;