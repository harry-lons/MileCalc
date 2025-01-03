import React, { useState, useEffect } from 'react';

const FP = () => {
  const [mileage, setMileage] = useState('');
  const [hasRest, setHasRest] = useState(false);
  const [hasLong, setHasLong] = useState(false);
  const [returnMessage, setReturnMessage] = useState('');
  const [plans, setPlans] = useState([
    Array(7).fill(0),
    Array(7).fill(0),
    Array(7).fill(0)
  ]);
  const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode); // Set initial state based on stored value
      }, []); 

  // Helper function to normalize weights
  const normalize = (weights) => {
    const sum = weights.reduce((acc, val) => acc + val, 0);
    return weights.map(weight => weight / sum);
  };

  // Generate plan one - balanced approach
  const generatePlanOne = (days, long, mileage) => {
    const res = new Array(7).fill(0);
    const weights = new Array(7).fill(0);

    if (days === 6) {
      weights[0] = 0;
      if (long) {
        weights[6] = 1/4;
        weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = 3/20;
      } else {
        weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = weights[6] = 1/6;
      }
    } else {
      if (long) {
        weights[6] = 1/4;
        weights[0] = weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = 1/8;
      } else {
        weights[0] = weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = weights[6] = 1/7;
      }
    }

    let miles = 0;
    for (let i = 0; i < 7; i++) {
      res[i] = Math.floor(weights[i] * mileage);
      miles += res[i];
    }

    let curr = 0;
    while (miles < mileage) {
      if (!(long && curr === 6) && !(days === 6 && curr === 0)) {
        res[curr % 7]++;
        miles++;
      }
      
      if ((days % 2 === 0 && long) || (days % 2 === 1 && !long)) {
        curr += 2;
      } else {
        curr += 3;
      }
    }

    return res;
  };

  // Generate plan two - alternating days
  const generatePlanTwo = (days, long, mileage) => {
    const res = new Array(7).fill(0);
    const weights = new Array(7).fill(0);

    if (days === 6) {
      weights[0] = 0;
      if (long) {
        weights[6] = 1/5;
        weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = 4/25;
      } else {
        weights[1] = weights[3] = weights[5] = 2/9;
        weights[2] = weights[4] = weights[6] = 1/9;
      }
    } else {
      if (long) {
        weights[6] = 1/5;
        weights[0] = weights[1] = weights[2] = weights[3] = weights[4] = weights[5] = 1/8;
      } else {
        weights[0] = weights[2] = weights[4] = weights[6] = 1/6;
        weights[1] = weights[3] = weights[5] = 1/12;
      }
    }

    let miles = 0;
    for (let i = 0; i < 7; i++) {
      res[i] = Math.floor(weights[i] * mileage);
      miles += res[i];
    }

    let curr = 0;
    while (miles < mileage) {
      if (!(long && curr === 6) && !(days === 6 && curr === 0)) {
        res[curr % 7]++;
        miles++;
      }
      
      if ((days % 2 === 0 && long) || (days % 2 === 1 && !long)) {
        curr += 2;
      } else {
        curr += 3;
      }
    }

    return res;
  };

  // Generate plan three - random approach
  const generatePlanThree = (days, long, mileage) => {
    const res = new Array(7).fill(0);
    let weights = new Array(7).fill(0);

    if (days === 6) {
      weights[0] = 0;
      if (long) {
        weights[6] = 1.2;
        for (let i = 1; i <= 5; i++) {
          weights[i] = Math.random();
        }
      } else {
        for (let i = 1; i <= 6; i++) {
          weights[i] = Math.random();
        }
      }
    } else {
      if (long) {
        weights[6] = 1.2;
        for (let i = 0; i <= 5; i++) {
          weights[i] = Math.random();
        }
      } else {
        for (let i = 0; i <= 6; i++) {
          weights[i] = Math.random();
        }
      }
    }

    weights = normalize(weights);
    
    let miles = 0;
    for (let i = 0; i < 7; i++) {
      res[i] = Math.floor(weights[i] * mileage);
      miles += res[i];
    }

    let curr = 0;
    while (miles < mileage) {
      if (!(long && curr === 6) && !(days === 6 && curr === 0)) {
        res[curr % 7]++;
        miles++;
      }
      
      if ((days % 2 === 0 && long) || (days % 2 === 1 && !long)) {
        curr += 2;
      } else {
        curr += 3;
      }
    }

    return res;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const intMileage = parseInt(mileage);
    if (intMileage === 0 || isNaN(intMileage)) {
      setReturnMessage("Something went wrong, try again! Only enter a valid nonzero number");
      return;
    }

    setReturnMessage(`Here's a few plans to hit ${intMileage} miles!`);
    
    const days = hasRest ? 6 : 7;
    const planOne = generatePlanOne(days, hasLong, intMileage);
    const planTwo = generatePlanTwo(days, hasLong, intMileage);
    const planThree = generatePlanThree(days, hasLong, intMileage);
    
    setPlans([planOne, planTwo, planThree]);
  };

  return (
    <div id="wrapper" className="divided">
      {/* Banner Section */}
      <section className={`banner style1 orient-left color2 content-align-left image-position-right onload-image-fade-in onload-content-fade-right ${darkMode ? 'invert' : ''}`} id="#">
        <div className="content">
          <h1>Fresh Plan</h1>
          <p className="major">Create a plan from scratch. <a href="/">Click here to go home</a></p>
        </div>
        <div className="image">
          <img src="/images/lacing-shoes.webp" alt="Lacing shoes" />
        </div>
      </section>

      {/* How it Works Section */}
      <section className={`spotlight style3 orient-right content-align-center ${darkMode ? 'invert' : ''}`} id="first">
        <div className="content">
          <h2>How it works</h2>
          <p>Fill out the preferences below, click generate, and multiple plan options will be created for you. If you would like to enter last week's training, try <a href="/builder">Builder</a>.</p>
        </div>
      </section>

      {/* Preferences Form Section */}
      <section className={`wrapper style1 align-center ${darkMode ? 'invert' : ''}`}>
        <div className="inner">
          <section>
            <header>
              <h3>Preferences</h3>
            </header>
            <div className="content">
              <form onSubmit={handleSubmit}>
                <div className="fields" style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div className="field third">
                    <label htmlFor="mileage">Target Mileage</label>
                    <input 
                      type="text" 
                      name="mileage" 
                      id="mileage" 
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                    />
                  </div>
                  <div className="field third">
                    <input 
                      type="checkbox" 
                      id="rest" 
                      name="rest"
                      checked={hasRest}
                      onChange={(e) => setHasRest(e.target.checked)}
                    />
                    <label htmlFor="rest">Rest Day</label>
                  </div>
                  <div className="field third">
                    <input 
                      type="checkbox" 
                      id="long" 
                      name="long"
                      checked={hasLong}
                      onChange={(e) => setHasLong(e.target.checked)}
                    />
                    <label htmlFor="long">Long Run</label>
                  </div>
                  <ul className="actions">
                    <li><input type="submit" value="Generate!" /></li>
                  </ul>
                </div>
              </form>
            </div>
          </section>

          {/* Generated Plans Table */}
          <section className={`${darkMode ? 'invert' : ''}`}>
            <h3>{returnMessage}</h3>
            <div className="table-wrapper align-center">
              <table className="alt">
                <thead>
                  <tr>
                    <th className="align-center">Mon</th>
                    <th className="align-center">Tue</th>
                    <th className="align-center">Wed</th>
                    <th className="align-center">Thu</th>
                    <th className="align-center">Fri</th>
                    <th className="align-center">Sat</th>
                    <th className="align-center">Sun</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan, planIdx) => (
                    <tr key={planIdx}>
                      {plan.map((value, dayIdx) => (
                        <td key={dayIdx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h5>(The third plan is often quite strange. It's randomly generated)</h5>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className={`wrapper style1 align-center ${darkMode ? 'invert' : ''}`}>
        <div className="inner">
          <h2>Contact</h2>
          <p>Have suggestions for this site? Contact me on one of my socials below!</p>
          <ul className="icons">
            <li>
              <a href="https://x.com/HarryLonsd52585" target="_blank" rel="noopener noreferrer" className="icon brands style2 fa-twitter">
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/harry.lons/" target="_blank" rel="noopener noreferrer" className="icon brands style2 fa-instagram">
                <span className="label">Instagram</span>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/harry-lonsdale-386156253/" target="_blank" rel="noopener noreferrer" className="icon brands style2 fa-linkedin-in">
                <span className="label">LinkedIn</span>
              </a>
            </li>
          </ul>
          <p>Quick Links: <a href="/">Home</a> / <a href="/fp">FP</a> / <a href="/builder">Builder</a></p>
          <p>Design template: <a href="https://html5up.net" target="_blank" rel="noopener noreferrer">HTML5 UP</a>.</p>
        </div>
      </footer>
    </div>
  );
};

export default FP;