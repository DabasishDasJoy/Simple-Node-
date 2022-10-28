import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  console.log("🚀 ~ file: App.jsx ~ line 6 ~ App ~ users", users);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const newUSer = { name, email };
    console.log(name, email);

    //send data to server
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUSer),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers([...users, data]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" />
        <input type="email" name="email" id="" />
        <button type="submit">Save</button>
      </form>

      <div>
        <h1>User: {users.length}</h1>
        <ul>
          {users.map((user) => (
            <li>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
