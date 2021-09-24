import React from "react";

const AboutMe = () => {
  return (
    <div>
      <h3 id="about-title">About Me</h3>
      <div className="about-text-container">
        <h4>
          <p id="about-first">
            💫💖 Hi! My name is María Fernanda / Super Rookie! 💖💫
          </p>
          <p>
            I made this app because I consistently saw other collectors as well
            as myself forgetting their past trades and purchases. I kept seeing
            friends purchase the same photocard twice or joining Group Orders
            and not remembering whose they joined after months had passed.
          </p>
          <p>
            This year I studied Web Development, and thought I could make a site
            that my friends, my community, and I could actually use and benefit
            from!
          </p>
          <p>
            I hope you like the site :) I've put a lot of work into it! It's not
            perfect by any means though! I'm just one person doing this for fun!
            Happy to take feedback on the Discord~
          </p>
          <p>Thank you again for using this site and happy collecting :)</p>
          <div id="about-ul-container">
            <ul id="about-ul">
              <li>
                Looking to hire a{" "}
                <a
                  href="https://www.linkedin.com/in/mafermafer/"
                  target="_blank"
                >
                  Fullstack Software Engineer
                </a>{" "}
                ?👀
              </li>
              <li>
                Follow me on my{" "}
                <a href="https://superrookie.carrd.co/" target="_blank">
                  Kpop Social Media
                </a>{" "}
                ~
              </li>
              <li>
                Join the{" "}
                <a href="https://discord.gg/VFVypKebxy" target="_blank">
                  Discord Community
                </a>{" "}
                for updates and requests!
              </li>
            </ul>
          </div>
        </h4>
      </div>
    </div>
  );
};

export default AboutMe;
