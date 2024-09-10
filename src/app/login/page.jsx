import React from 'react'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Password" />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Login