import React, { useEffect, useState } from "react";
import { getAllOrders } from "../axios-services/orders";
import { getUsers } from "../axios-services/users";
import useAuth from "../hooks/useAuth";

function AdminDashboard() {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const users = await getUsers();
      setAllUsers(users);
    }
    async function fetchOrders() {
      const orders = await getAllOrders();
      console.log(
        "%cAdminDashboard.jsx line:17 orders",
        "color: white; background-color: #007acc;",
        orders
      );
      setAllOrders(orders);
    }
    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <div>
      {user.isAdmin ? (
        <>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Shipping Address</th>
                <th>Billing Address</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, i) => {
                return (
                  <tr key={`alluser${i}`}>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.shippingAddress}</td>
                    {user.billingAddress ? (
                      <td>{user.billingAddress}</td>
                    ) : (
                      <td>N/A</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>Pending Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Username</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, i) => {
                return (
                  <tr key={`order${i}`}>
                    {!order.isActive ? (
                      <>
                        <td>{order.id}</td>
                        <>
                          {allUsers.map((user, i) => {
                            const id = user.id;
                            const orderUserId = order.userId;
                            const username = user.username;
                            const address = user.shippingAddress;
                            return (
                              <React.Fragment key={`orderData${i}`}>
                                <td>{id === orderUserId ? username : null}</td>
                                <td>{id === orderUserId ? address : null}</td>
                              </React.Fragment>
                            );
                          })}
                        </>
                      </>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <h2>You are not authorized to view this page :/</h2>
      )}
    </div>
  );
}

export default AdminDashboard;
