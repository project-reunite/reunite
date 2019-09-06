import './footer.scss';

import React from 'react';

const Footer = () => (
  <footer className="pageFooter">
    <div className="footerContainer">
      <div className="footerElementContainer">
        <img className="footerImage" src="reunite-icon.svg" alt="" />
        <p>Video</p>
      </div>
      <div className="footerElementContainer">
        <a href="https://github.ibm.com/ProjectReunite/reunite">
          <img className="footerImage" src="github.png" alt="" />
        </a>
        <p>More Info</p>
      </div>
      <div className="footerElementContainer">
        <a href="https://w3.ibm.com/w3publisher/cognitive-applications/updates-from-bob/a7222250-cf31-11e9-8f65-2d7c559e6321">
          <img className="footerImage" src="tick.svg" alt="" />
        </a>
        <p>Vote</p>
      </div>
    </div>
  </footer>
);

export default Footer;
