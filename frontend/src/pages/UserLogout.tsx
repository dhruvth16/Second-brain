import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  try {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("token");
        navigate("/");
      });
  } catch (error) {
    console.log(error);
  }
  return <div>UserLogout</div>;
};

export default UserLogout;
