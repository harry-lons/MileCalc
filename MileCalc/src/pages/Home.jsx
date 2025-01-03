import React, {useEffect, useState} from "react";

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode); // Set initial state based on stored value
      }, []); 

    const toggleDarkMode = () => {
        console.log("toggling");
        if (darkMode === true) {
            console.log("setting false");
            setDarkMode(false);
            localStorage.setItem('darkMode', false);
        } else {
            console.log("setting true");
            setDarkMode(true);
            // If 'darkMode' is false or does not exist, set it to true
            localStorage.setItem('darkMode', true);
        }
    };

    return (
        <div id="wrapper" className="divided">
            {/* Banner Section */}
            <section
                className={`banner style1 orient-left content-align-left image-position-right fullscreen onload-image-fade-in onload-content-fade-right ${darkMode ? 'invert' : ''}`}
            >
                <div className="content">
                    <h1>MileCalc</h1>
                    <p className="major">
                        A personal web development project designed to automate weekly run planning. Try{" "}
                        <a id="darkMode" style={{ cursor: "pointer" }} onClick={toggleDarkMode}>
                            dark mode
                        </a>
                    </p>
                    <ul className="actions stacked">
                        <li>
                            <a href="#first" className="button big wide smooth-scroll-middle">
                                Get Started
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="image">
                    <img src="/images/dirtRoad.jpg" alt="Dirt Road" />
                </div>
            </section>

            {/* Purpose Section */}
            <section
                className={`spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in ${darkMode ? 'invert' : ''}`}
                id="first"
            >
                <div className="content">
                    <h2>Purpose</h2>
                    <p>
                        As a self-trained long distance runner, I'm constantly planning my own training. I don't want a computer
                        to generate all of my workouts for me, but I spend an unnecessary amount of time each week adding up
                        mileage of runs to find the right amount of miles per day to hit a certain weekly mileage. I figured I could
                        automate this menial task by building a website that does it for me. I've created two options:{" "}
                        <a href="#FreshPlan" className="smooth-scroll-middle">
                            Fresh Plan
                        </a>{" "}
                        and{" "}
                        <a href="#Builder" className="smooth-scroll-middle">
                            Builder
                        </a>
                        .
                    </p>
                </div>
                <div className="image">
                    <img src="/images/stock_runner_1.jpeg" alt="Runner" />
                </div>
            </section>

            {/* Fresh Plan Section */}
            <section
                className={`spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in ${darkMode ? 'invert' : ''}`}
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
                    <img src="/images/mountains.webp" alt="Mountains" />
                </div>
            </section>

            {/* Builder Section */}
            <section
                className={`spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in ${darkMode ? 'invert' : ''}`}
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
                    <img src="/images/stravaGraphWide.jpg" alt="Strava Graph" />
                </div>
            </section>

            {/* Footer */}
            <footer className={`wrapper style1 align-center ${darkMode ? 'invert' : ''}`}>
                <div className="inner">
                    <h2>Contact</h2>
                    <p>Have suggestions for this site? Contact me on one of my socials below!</p>
                    <ul className="icons">
                        <li>
                            <a
                                href="https://x.com/HarryLonsd52585"
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
                        Quick Links: <a href="./">Home</a> / <a href="/fp">FP</a> / <a href="/builder">Builder</a>
                    </p>
                    <p>
                        Design template:{" "}
                        <a href="https://html5up.net" target="_blank" rel="noopener noreferrer">
                            HTML5 UP
                        </a>
                        .
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
