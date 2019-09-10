import './footer.scss';

import React from 'react';

import Translate from '../../locales/translate';

const Footer = () => (
  <footer className="pageFooter">
    <div className="footerContainer">
      <div className="footerElementContainer">
        <a href="https://github.ibm.com/ProjectReunite/reunite#project-reunite">
          <img className="footerImage" src="reunite-icon.svg" alt="" />
        </a>
        <p>
          <Translate string="footer.more-info" />
        </p>
      </div>
      <div className="footerElementContainer">
        <a href="https://github.ibm.com/ProjectReunite/reunite/issues/new/choose">
          <img className="footerImage" src="github.png" alt="" />
        </a>
        <p>
          <Translate string="footer.feedback" />
        </p>
      </div>
      <div className="footerElementContainer">
        <a href="https://w3.ibm.com/w3publisher/cognitive-applications/updates-from-bob/a7222250-cf31-11e9-8f65-2d7c559e6321">
          <img className="footerImage" src="tick.svg" alt="" />
        </a>
        <p>
          <Translate string="footer.vote" />
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
