import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";

export const inputVariants =
  "border outline-none w-full border-gray-300 rounded-md px-4 py-2 mt-4 bg-blue-50";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signin`,
        {
          email,
          password,
        }
      );
      setUser(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
      console.log(response.data);
      console.log(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen w-full">
        <div className="flex gap-2 items-center p-2 absolute">
          <img
            className="w-10 h-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeemlI4oHh5P482LNs8t88BJrsamSaPCpNDoolJmQsxyMyTX8l"
            alt=""
          />
          <h2 className="text-2xl font-semibold tracking-tight">
            Second Brain
          </h2>
        </div>
        <form
          onClick={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center h-full"
        >
          <h1 className="text-3xl font-bold flex mb-2">
            Login{" "}
            <img
              className="w-10 h-10"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeemlI4oHh5P482LNs8t88BJrsamSaPCpNDoolJmQsxyMyTX8l"
              alt=""
            />
          </h1>
          <div className="flex flex-col items-center justify-center bg-[#e6edfc] p-6 rounded-md w-[500px]">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className={inputVariants}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className={inputVariants}
            />
            <Link
              to="/home"
              onClick={loginUser}
              className="bg-[#5046E2] text-white px-4 py-2 mt-4 rounded-md cursor-pointer"
            >
              Login
            </Link>
          </div>
          <p className="text-left w-[500px] mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#5046E2] text-lg">
              register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
