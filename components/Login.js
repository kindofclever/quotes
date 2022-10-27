import { useState } from "react";

import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";

const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="border-4 border-dotted w-[80%] py-5 mb-5">
      <div className="flex flex-col justify-center items-center ">
        <h3>Register</h3>
        <input
          type="email"
          placeholder="... your e-mail adress"
          className="border-2 m-2 p-2 h-10 w-30 text-[#090a0a]"
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="... chose a password"
          className="border-2 m-2 p-2 h-10 w-30 text-[#090a0a]"
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <button
          onClick={register}
          className="w-30 h-10 px-[2em] m-2 p-2 bg-[#dddde3] hover:bg-[#503ee7] text-[#503ee7] hover:text-[#dddde3]"
        >
          Create Account
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3>Login</h3>
        <input
          type="email"
          placeholder="... your e-mail adress"
          className="border-2 m-2 p-2 h-10 w-30 text-[#090a0a]"
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="... your password"
          className="border-2 m-2 p-2 h-10 w-30 text-[#090a0a]"
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button
          onClick={login}
          className="w-30 h-10 px-[4em] m-2 p-2 bg-[#dddde3] hover:bg-[#503ee7] text-[#503ee7] hover:text-[#dddde3]"
        >
          Login
        </button>
      </div>
      <button
        onClick={logout}
        className="w-30 h-10 px-[4em] m-2 p-2 bg-[#dddde3] hover:bg-[#503ee7] text-[#503ee7] hover:text-[#dddde3]"
      >
        Sign out
      </button>
      <h3>Hello {user?.email}, you are logged in!</h3>
    </div>
  );
};

export default Login;
