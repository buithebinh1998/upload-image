import React from "react";
import { Link } from "react-router-dom";
import "./color.css";
import "./grid.css";
import "./style.css";
import camera from "./camera.jpeg";
import camera2 from "./camera2.jpg";
import camera3 from "./camera3.jpg";
import dog from "./Dog.jpg";
import logo2 from "./logo2.png";

const HomeContent = () => {
  return (
    <div>
      <header>
        <a href="#">
          {" "}
          <img className="logo" src={logo2} alt="logo2" />
        </a>
        <u1 className="main-nav">
          <li>
            {" "}
            <a href="#"> About </a>
          </li>
          <li>
            {" "}
            <Link to="/upload"> Product </Link>
          </li>
          <li>
            {" "}
            <a href="#"> Member </a>
          </li>
        </u1>
        <div className="clearfix" />
        <div className="row">
          <div className="heading-main-box">
            <h1>
              <br />
              This page is contain <br /> pictures of people <br /> who do not
              wear <br /> mask and have <br />
              temperature over 37.5
            </h1>
            <a href="#" className="btn">
              {" "}
              CLICK HERE{" "}
            </a>
          </div>
        </div>
      </header>
      <section className="about-section">
        <div className="row">
          <h2>About</h2>
          <p className="p-long">
            Nowadays, Covid-19 epidemic is spread significantly in our country
            as well as in the world, making people is limited when go to work,
            study or go out. Every time you go to a public place, you must wear
            a mask, check your temperature, and wash your hands. The manual
            inspection method like this is very time consuming and laborious.
            After doing the research, the team came up with a solution for
            manual inspection, replacing it by checking, measuring body
            temperature by camera. The team decided to use infrared cameras to
            check the body temperature as well as traditional cameras to check
            the masks, and after researching, this solution is extremely
            convenient, minimizing human effort. After researching into the
            product, we can apply it in entertainment places, shopping centers,
            companies, hospitals, ... The result is a good recognition system of
            masks as well as measure the temperature quickly.
          </p>
        </div>
        <div className="row">
          <div className="col span-1-of-3 about-picture">
            <img src={dog} alt="dog1" />
            <p className="picture-title">Dog 1</p>
          </div>
          <div className="col span-1-of-3 about-picture">
            <img src={dog} alt="dog2" />
            <p className="picture-title">Dog 2</p>
          </div>
          <div className="col span-1-of-3 about-picture">
            <img src={dog} alt="dog3" />
            <p className="picture-title">Dog 3</p>
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="row">
          <h2>Product</h2>
          <p className="p-long">This is our product</p>
        </div>
        <div className="row">
          <div className="col span-1-of-3 about-picture">
            <img src={camera} alt="cam1" />
            <p className="picture-title">Camera 1</p>
          </div>
          <div className="col span-1-of-3 about-picture">
            <img src={camera2} alt="cam2" />
            <p className="picture-title">Camera 2</p>
          </div>
          <div className="col span-1-of-3 about-picture">
            <img src={camera3} alt="cam3" />
            <p className="picture-title">Camera 3</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
