import React from "react";
import Link from 'next/link'

const Welcome = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <Link href="/registration">Sign up</Link>
        <Link href="/login">Log in</Link>
      </div>
    </div>
  );
};

export default Welcome;