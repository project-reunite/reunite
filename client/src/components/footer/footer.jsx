import './footer.scss';

import React from 'react';

import Translate from '../../locales/translate';

const Footer = () => (
  <footer className="pageFooter">
    <div className="footerContainer">
      <div className="footerElementContainer">
        <a
          href="https://github.ibm.com/ProjectReunite/reunite#project-reunite"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="footerImage" src="reunite-icon.svg" alt="" />
        </a>
        <p>
          <Translate string="footer.more-info" />
        </p>
      </div>
      <div className="footerElementContainer">
        <a
          href="https://github.ibm.com/ProjectReunite/reunite/issues/new/choose"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="footerImage" src="github.png" alt="" />
        </a>
        <p>
          <Translate string="footer.feedback" />
        </p>
      </div>
      <div className="footerElementContainer">
        <a
          href="https://www.surveygizmo.com/s3/5198505/IBMer-s-Choice-Award-Call-for-Code-The-Internal-Final-Five"
          target="_blank"
          rel="noopener noreferrer"
        >
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
