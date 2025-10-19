import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [info, setInfo] = React.useState({name : "Nayan Malviya"});

  function onLoginClick(){
    setIsLogin(true);
  }

  function onLogOutClick(){
    setIsLogin(false);
  }

  return (
    <div className="App">
      <Navbar isLogin={isLogin} onLoginClick={onLoginClick} info={info} onLogOutClick={onLogOutClick} />

      <main className="flex-grow-1">
        <Hero />
        <Features />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
