import { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar.jsx";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import ChatWindow from "./ChatWindow.jsx";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import Update from "./Update.jsx"
import { MyContext } from "./MyContext.jsx";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [prompt, setPrompt] = useState("");
  const [newChat, setNewChat] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(true);
  const [info, setInfo] = useState([]);
  const [newId, setNewId] = useState("");

  const ProviderValues = {
    prompt,setPrompt,
    newChat,setNewChat,
    data,setData,
    title,setTitle,
    info,setInfo,
    newId,setNewId,
  };

  const token = localStorage.getItem("token");

  return (
    <MyContext.Provider value={ProviderValues}>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={token? <Navigate to="/" />:<SignUp/>} />

          <Route path="/login" element={token? <Navigate to="/" />:<Login/>}/>
          <Route path="/update" element={<Update/>}/>
          <Route
            path="/"
            element={
              token ? (
                <div className="container">
                  <Sidebar />
                  <ChatWindow />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
          transition={Bounce}
          toastStyle={{
            width: "35rem",
            minHeight: "4rem",
            fontSize: "1.4rem",
            borderRadius: "0.75rem",
            padding: "1.1rem"
          }}
        />
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;