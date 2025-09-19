import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  console.log("Body component rendered, user:", user);

  const fetchUser = async () => {
    console.log("Fetching user from:", BASE_URL + "/profile/view");
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("User fetched successfully:", response.data);
      dispatch(addUser(response.data));
    } catch (err) {
      console.log("Error fetching user:", err);
      console.log("Error status:", err.response?.status);
      if (err.response?.status === 401) {
        console.log("Redirecting to login");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    console.log("Body useEffect triggered, user:", user);
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
