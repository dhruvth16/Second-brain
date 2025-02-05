import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserDataContext";
import { Input } from "../components/Input";
import Button from "../components/Button";

const RegisterPage = () => {
  // two - way binding
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        {
          email,
          password,
          fullname: {
            firstname,
            lastname,
          },
        }
      );
      setUser(response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
      //   console.log(response.data);
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
          onClick={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col items-center justify-center h-full"
        >
          <h1 className="text-3xl font-bold flex mb-2">
            Register{" "}
            <img
              className="w-10 h-10"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeemlI4oHh5P482LNs8t88BJrsamSaPCpNDoolJmQsxyMyTX8l"
              alt=""
            />
          </h1>
          <div className="flex flex-col items-center justify-center bg-[#e6edfc] p-6 rounded-md w-[500px]">
            <Input
              value={email}
              setValue={setEmail}
              type="email"
              placeholder="Email"
            />
            <Input
              value={password}
              setValue={setPassword}
              type="password"
              placeholder="Password"
            />
            <Input
              value={firstname}
              setValue={setFirstname}
              type="text"
              placeholder="Firstname"
            />
            <Input
              value={lastname}
              setValue={setLastname}
              type="text"
              placeholder="Lastname"
            />
            <Button
              onClick={registerUser}
              variant="tertiary"
              text="Register"
              size="lg"
            />
          </div>
          <p className="text-left w-[500px] mt-2">
            Already registered?{" "}
            <Link to="/" className="text-[#5046E2] text-lg">
              login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
