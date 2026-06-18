import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between ">
        <div className="logo">
          <RiProductHuntLine size={35} />
          <span>Stockroom</span>
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <Link className="home-button" to="/login">Login</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <Link className="home-button" to="/dashboard">Dashboard</Link>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      <section className="container hero">
        <img className="hero-product" src={heroImg} alt="Inventory dashboard preview" />
        <div className="hero-text">
          <p className="hero-eyebrow">Inventory command center</p>
          <h1>Inventory {"&"} Stock Management</h1>
          <p>
            Track products, stock levels, categories, and warehouse value from one
            focused dashboard built for day-to-day operators.
          </p>
          <div className="hero-buttons">
            <Link className="home-button home-button--light" to="/dashboard">
              Open Dashboard
              <FiArrowRight />
            </Link>
          </div>
          <div className="hero-proof">
            <NumberText num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div>
          <div className="hero-checks">
            <span><FiCheckCircle /> Stock alerts</span>
            <span><FiCheckCircle /> Product images</span>
            <span><FiCheckCircle /> Value tracking</span>
          </div>
        </div>
      </section>
      <section className="home-strip">
        <div className="container">
          <span>Dashboard-ready summaries</span>
          <span>Secure account flows</span>
          <span>Fast product search</span>
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
