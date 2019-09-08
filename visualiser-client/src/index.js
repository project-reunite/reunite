import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import apiRequests from './utils/apiRequests';
import { shuffleArray } from './utils/util-functions';
import { origin } from './config';
import './index.css';

const getUrls = async () => {
  const response = await apiRequests.getPersonUrls();
  const urls = response.data;
  return urls;
}

const getShuffledUrls = async () => {
  const urls = await getUrls();
  const shuffledUrls = shuffleArray(urls);
  return shuffledUrls;
}

const Page = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const urls = await getShuffledUrls();
        setUrls(urls);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUrls()
  }, []);

  const pageExplanation = <p>
    Here are 64 missing people. Choose (in your head) who you're looking for
  </p>;

  const backButton = <button type="button">
    When you're ready, tap here to go back to the Reunite app and start searching for them
  </button>;

  const faces = urls.map(url => {
    const absoluteUrl = `${origin}${url}`;
    return (<Face key={url} src={absoluteUrl}></Face>);
  });

  return [
    pageExplanation,
    backButton,
    <br></br>,
    faces,
  ];
}

const Face = (props) => (
  <img
    className="face"
    src={props.src}
    alt="Missing person"
  >
  </img>
  // For debug:
  // <p>{props.src}</p>
)





// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
