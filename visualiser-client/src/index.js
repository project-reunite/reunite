import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import apiRequests from './utils/apiRequests';

const getUrls = async () => {
  const response = await apiRequests.getPersonUrls();
  const urls = response.data;
  return urls;
}

const Page = () => {
  const [urls, setUrls] = useState([]);
  
  async function fetchUrls() {
    try {
      const urls = await getUrls();
      setUrls(urls);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => fetchUrls(), []);

  const faces = urls.map(url => (
    <Face src={url}></Face>
  ));
  return faces;
}

const Face = (props) => (
  <img className="face" src={props.src}></img>
)





// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
