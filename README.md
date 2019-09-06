# Project Reunite

## Table of Contents

- [Our Target Problem](#our-target-problem)
- [Our Solution](#our-solution)
- [FAQs](#faqs)
- [Project Roadmap](#project-roadmap)
- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)


## Our Target Problem

Over 40,000 people are currently separated from their families by natural disasters, with that number rising every year.

Charities such as the Red Cross are trying to reunite families. Red Cross have photographed thousands of survivors and put them on [a website](https://familylinks.icrc.org/europe/en/Pages/search-persons.aspx) for refugees to look through and find their loved ones.

But checking thousands of photos one at a time is slow. Every hour spent searching means more stress and risk for vulnerable refugees in camps. The search is often slowest for refugees in the *worst* conditions, who have unstable internet, have to share computers, or can't afford the mobile data to load thousands of photos.

The longer the search, the worse the mental health of refugees.

## Our Solution

But what if we could speed up the search tenfold?

We're using AI to sort survivors' photos, so that we can show refugees such as Arame the photos most resembling her son first:

1. We analyse all survivors' photos using Watson Visual Recognition, extracting features such as gender and face-shape.

2. This allows Arame to select search filters such as gender.

3. It also allows Arame to narrow down the search area by choosing between 2 faces representing the same feature, such as face-shape. If the first face represents round faces, and the second represents sharp faces, then we know to narrow down the search to round faces.

By dividing the search area repeatedly, we divide Arame's search time too:

- To find her son in 5,000 photos on Red Cross' existing website, she would on average have to check half of them. That's 2,500 photos to download and scroll through. But using our website, she would on average have to check only *30*.

- And if there were 50,000 survivor's photos, she'd have to look though 25,000 of them on Red Cross' website, but only *40* on ours.

So our prioritization algorithm makes searching really fast, and reunites Arame with her son quicker. Try it yourself at https://reunite.eu-gb.cf.appdomain.cloud, or watch our 3-minute demo:

[<img width="1275" alt="reunitethumbnail" src="https://media.github.ibm.com/user/186207/files/0b91ce00-b20b-11e9-9eff-05a9cfda3d50">
](https://ibm.box.com/s/qcqnxj41ksf20uft365zxp1ryxm2xx9j)

## FAQs

### Privacy
#### Why doesn't our app just let Arame search for missing people by name?
We want Arame to be able find her son even if he could not or did not want to give his name (e.g. if he was frightened). Moreover, charities' privacy policies may prohibit them from releasing refugees' names publicly. Further, many refugees might share the same name; some may spell their name incorrectly, and aid workers may record their names incorrectly.
#### Is anyone's privacy being violated?
No, because charities are already letting searchers look through all these photos - we are simply leading searchers through them more efficiently, which will allow us to show only a small subset of photos. Therefore, we will always adhere to the charities' privacy policies, for example, using only photos taken with people's permission, using the photos only to reunite people, and deleting the photos immediately after confirming reunification.

### User experience
#### How does Arame know about our website, and know how to use it?
Charities such as Red Cross already direct Arame and other searchers to their existing search sites; searchers will now find our app on those sites. We designed the site to be intuitive enough to use even if aid workers are unavailable to guide users through it.
#### What happens if Arame doesn't find a match after viewing all relevant photos?
We would then show her less relevant photos. Our system prioritises photos rather than filtering them, so that no photo is ever hidden. Therefore, in the worst case our system still matches the existing system, and in the best case our system far outperforms it. 

If Arame still doesn't find a match after viewing all (relevant & irrelevant) photos collected by the charity, then we apologise for the photo not being present, and present her with a button to easily contact a relevant aid worker for advice. She can choose to be notified when new photos are added.

### Deployment
#### What if refugees don't have smartphones or access to a stable internet connection?
Our app still improves on existing charities' sites, because refugees will complete their search in far fewer photos. This means a much shorter search time, so a few shared devices and limited mobile data will serve many more refugees than before.

## Project Roadmap

<p align="center"><img src="https://media.github.ibm.com/user/186211/files/60c5e380-b1fb-11e9-8650-fe5d0b817f45" align="center" width="65%" height="65%"></p>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Download Node.js v8 or above](https://github.com/nodejs/node#download)

### Installing

Clone the repo

```bash
git clone git@github.ibm.com:ProjectReunite/reunite.git
```

Install dependencies

```bash
npm install
```

### Run the app

```bash
npm run build

npm start
```

The app will be running at `http://localhost:9100`.

Alternatively, you can run `npm start` from
- `/server` to start only the server
- `/client` to start only the client

### Run the app in development mode

Run `npm run start:dev` from the root directory to start both the client and server in 'hot-restart' mode. Editing the client code will restart the client; editing the server code will restart the server

The client app will be running at `http://localhost:41002`.

The server will be running at `http://localhost:9100`.

## Running the Tests

### All tests

```bash
npm run test:full
```

Run this from the root directory to run integration and component tests for both the client and server.

### End-to-end tests

We use [Cypress](https://www.cypress.io/) to perform client-server integration tests. Cypress manipulates our client, checking that calling the server's API renders the correct components.

If the app is already running, run these tests via the following command:

```bash
# With Cypress UI
npm run cypress:open

# Without Cypress UI, in command line
npm run cypress:run
```

If the app is not already running, use the following command to start the app, run the integration tests, then clean up:

```bash
npm run test:integration
```

### Component tests

These do not require the app to be running.

#### Client

We use [Jest](https://jestjs.io/) to test in isolation that the client's components render correctly.

```bash
cd client

# Run all component tests
jest

# Run all component tests in watch mode
jest --watch
```

#### Server

We use [Mocha](https://mochajs.org/) to test our server's APIs.

```bash
cd server

# Run all API tests
npm test

# Run all API tests and generate coverage report
npm run test:coverage
```

## Built With

- IBM technologies:
  - [Watson Visual Recognition](https://www.ibm.com/watson/services/visual-recognition/)
  - [Cloudant Database](https://www.ibm.com/cloud/cloudant)
  - [Cloud Object Storage](https://www.ibm.com/cloud/object-storage)
  - [Cloud Foundry](https://www.ibm.com/uk-en/cloud/cloud-foundry)
- [React](https://reactjs.org/docs/react-api.html#react.createelement)
- [Mineral UI](https://github.com/mineral-ui/mineral-ui)
- [Cypress](https://www.cypress.io/)

## Authors

- [James Cockbain](https://github.ibm.com/James-Cockbain)
- [Craig Forrest](https://github.ibm.com/Craig-Forrest)
- [Liam Hampton](https://github.ibm.com/Liam-Hampton)
- [Richard Waller](https://github.ibm.com/Richard-Waller)
- [Michael Westerby](https://github.ibm.com/Michael-Westerby)

## Acknowledgments

- Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
- Inspired by Red Cross's [*Trace the Face* reunification project](https://familylinks.icrc.org/europe/en/Pages/Home.aspx) and [everyone's favorite guessing game](https://en.wikipedia.org/wiki/Guess_Who%3F)
