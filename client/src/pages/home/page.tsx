import React, { useEffect, useState } from "react";
import axiosIns from "../../libs/axios";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  // const [user, setUser] = useState<any>(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosIns.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        toast.error("Failed to fetch user data");
        console.error("Fetch user error:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h2>Welcome{user ? `, ${user.name || user.email}` : ""}!</h2>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user.name || "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
