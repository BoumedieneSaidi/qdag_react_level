import React, { useState } from "react";
import useToken from "../App/useToken";
import Login from "../Login/Login";
async function changeSpringUrl(springUrl) {
  return fetch(process.env.REACT_APP_API_URL + "/change-spring-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify(springUrl),
  }).then((data) => data.json());
}
export default function Dashboard() {
  const [springUrl, setSpringUrl] = useState();
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await changeSpringUrl({
      springUrl,
    });
    if (resp["status"] !== undefined) alert("Spring URL changed succesfully");
  };
  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          <p>springUrl</p>
          <input type="text" onChange={(e) => setSpringUrl(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
