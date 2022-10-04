import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <div className="page-view">

        <div className="signup">
          <h2>Create an Account</h2>

          <div>
            <form onSubmit={handleFormSubmit} className="form-flex">
              <input
                placeholder="Choose a username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
                className="form-input"
              />
              <input
                placeholder="Enter your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
                className="form-input"
              />
              <input
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
                className="form-input"
              />
              <button className="submit-btn">Create New Account</button>
            </form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
