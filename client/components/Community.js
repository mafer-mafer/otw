import React from "react";

export class Community extends React.Component {
  render() {
    return (
      <div>
        <h3 className="form-title">Community</h3>
        <h4 id="home-discord-subtitle">✨Join our Discord Community!✨</h4>
        <div id="home-comm-list">
          <ul>
            <li> Meet Other Collectors</li>
            <li> Get the Latest Updates</li>
            <li> Provide Feedback</li>
            <li> Alert of any Bugs or Typos</li>
            <li> Request Any Features</li>
            <li> Request for Groups to be Added</li>
          </ul>
        </div>
        <a href="https://discord.gg/VFVypKebxy" target="_blank">
          <button className="buttons purple">Join Here!</button>
        </a>
      </div>
    );
  }
}
export default Community;
