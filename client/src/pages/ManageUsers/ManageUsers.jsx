import { useEffect, useState } from "react";
import { api } from "../../utilities/api";
import "./ManageUsers.css";
import { UsersTable } from "../../components/UsersTable/UsersTable";

export const ManageUsers = ({ cart, products, removeFromCart, setCart }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await api.getUsers();
    if (response.ok) {
      const users = await response.json();
      console.log("users", users);
      setUsers(users);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="Cart">
      <h1>Users</h1>

      <UsersTable body={users} fetchUsers={fetchUsers} />
    </div>
  );
};
