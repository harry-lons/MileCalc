import React from 'react';

const Builder = () => {
  return (
    <div id="wrapper" className="divided">
      {/* Banner Section */}
      <section className="banner style1 color6 orient-left content-align-left image-position-right onload-image-fade-in onload-content-fade-right">
        <div className="content">
          <h1>Builder</h1>
          <p className="major">
            Build upon previous training. <a href="/">click here to go home</a>
          </p>
        </div>
        <div className="image">
          <img src="images/dirtRoad.jpg" alt="Dirt road" />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="spotlight style3 orient-right content-align-center" id="first">
        <div className="content">
          <h2>How it works</h2>
          <p>
            This option is coming soon! If you would like a plan from scratch, try{' '}
            <a href="/fp">Fresh Plan</a>.
          </p>
        </div>
      </section>

      {/* Fresh Plan Section */}
      <section
        className="spotlight style5 orient-left content-align-left image-position-center onscroll-image-fade-in"
        id="FreshPlan"
      >
        <div className="content">
          <h2>Fresh Plan</h2>
          <p>
            No previous weeks? No problem! This tool allows you to generate a reasonable weekly plan to hit the mileage
            you want, no strings attached.
          </p>
          <ul className="actions stacked">
            <li>
              <a href="/fp" className="button">
                Launch Fresh Plan
              </a>
            </li>
          </ul>
        </div>
        <div className="image">
          <img src="images/spotlight02.jpg" alt="Fresh Plan" />
        </div>
      </section>

      {/* Builder Section */}
      <section
        className="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in"
        id="Builder"
      >
        <div className="content">
          <h2>Builder</h2>
          <p>
            Have a schedule that works for you, but want to change your mileage? Builder allows you to enter your recent
            training and receive a mileage plan which caters to the schedule you already follow.
          </p>
          <ul className="actions stacked">
            <li>
              <a href="/builder" className="button">
                Launch Builder
              </a>
            </li>
          </ul>
        </div>
        <div className="image">
          <img src="images/spotlight03.jpg" alt="Builder" />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="wrapper style1 align-center">
        <div className="inner">
          <h2>Contact</h2>
          <p>Have suggestions for this site? Contact me on one of my socials below!</p>
          <ul className="icons">
            <li>
              <a
                href="https://twitter.com/tsunodium"
                target="_blank"
                rel="noopener noreferrer"
                className="icon brands style2 fa-twitter"
              >
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/harry.lons/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon brands style2 fa-instagram"
              >
                <span className="label">Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/harry-lonsdale-386156253/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon brands style2 fa-linkedin-in"
              >
                <span className="label">LinkedIn</span>
              </a>
            </li>
          </ul>
          <p>
            Quick Links: <a href="/">Home</a> / <a href="/fp">FP</a> / <a href="/builder">Builder</a>
          </p>
          <p>
            Design template: <a href="https://html5up.net" target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Builder;
