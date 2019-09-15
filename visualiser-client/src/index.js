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

  const numMissingPeople = urls.length || 128;

  const pageExplanation = [
    (<h2>
      {`Here are the ${numMissingPeople} missing people.`}
    </h2>),
    (<h3>
      Choose (in your head) who you're looking for.
    </h3>),
    (<h3>
      When you're ready, go back to the Reunite app to start searching for them.
    </h3>),
    (<p>
      (These photos are generated from celebrity faces. This demo uses these faces because we do not yet have access to a database of refugees)
    </p>),
  ];

  const faces = urls.map(url => {
    const absoluteUrl = `${origin}${url}`;
    return (<Face key={url} src={absoluteUrl}></Face>);
  });

  return [
    pageExplanation,
    (<br></br>),
    faces,
  ];
}

const Face = (props) => {
  const { src } = props;
  return (
    <img
      className="face"
      src={src}
      alt="Missing person"
    >
    </img>
  )
}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
