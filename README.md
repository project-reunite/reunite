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

So our prioritization algorithm makes searching really fast, and reunites Arame with her son quicker. Try it yourself at http://ibm.biz/reunite, or watch our 3-minute demo:

[<img width="1275" alt="reunitethumbnail" src="https://media.github.ibm.com/user/186207/files/0b91ce00-b20b-11e9-9eff-05a9cfda3d50">
](https://www.youtube.com/watch?v=wJdD2aP3QeQ)

## FAQs

### Privacy
#### Why doesn't our app just let Arame search for missing people by name or other metadata?
We want Arame to be able find her son even if charities cannot release his name or metadata publicly (for example, if their privacy policies prohibit it). Moreover, the survivor metadata they've collected may be insufficient (e.g. if Arame's son was too scared to give his name). Finally, their metadata may be inaccurate, if survivors and aid workers spell survivors' names incorrectly.
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
Refugees can access the Reunite website on a shared computer or an aid workers' smartphone.

The Reunite website also has an 'offline mode', allowing it to run by connecting to a local server nearby, rather than a server over the internet (see ['deploying the app', below](#deploying-the-app)).

In both these cases, our app still improves on existing charities' sites, because refugees will complete their search in far fewer photos. A shorter search time allows shared devices and limited connectivity to serve many more refugees than before.

## Project Roadmap

<p align="center"><img src="https://media.github.ibm.com/user/186211/files/60c5e380-b1fb-11e9-8650-fe5d0b817f45" align="center" width="65%" height="65%"></p>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Download Node.js v8 or above](https://github.com/nodejs/node#download)

### Installing

Clone the repo

```bash
git clone git@github.com:project-reunite/reunite.git
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

## Deploying the app

### Locally (for accessing the client site on the same computer)

1. Set up a [Cloudant database on IBM Cloud](https://cloud.ibm.com/catalog/services/cloudant), or run a local instance of  [Apache CouchDB](http://docs.couchdb.org/en/stable/install/mac.html).
2. In `server/src/config/index.js`, set where your database is located. (If it is located on the cloud, ensure you have specified your login details in `server/src/config/index.js` or a `.env` file).
3. Run `npm run deploy:local`

### Local network (for accessing the client site on nearby devices, without a Wi-Fi connection)

1. Run a local instance of [Apache CouchDB](http://docs.couchdb.org/en/stable/install/mac.html).
2. On that instance, create a database called `persons_migrants`.
2. In `server/src/config/index.js`, set that your database is located locally by updating the value of `DB_LOCATION` to `'local'`.
3. Populate the `persons_migrants` database by going in `server/src/app.js`, uncommenting `require('./v2/services/personsGenerator.service')`, and running the app once. Comment the line again afterwards.
4. Run `npm run deploy:local-network`
5. Create a local network by (on Mac) going to `Wi-Fi settings` and selecting `Create Network`.
6. In `client/src/config/index.js`, change the `local-network` origin IP to be your computer's Private IP address (e.g. `192.168.0.0`). (On Mac, go to `System Preferences` -> `Network` -> `Wi-Fi`).
7. On nearby internet-enabled devices, open the `available networks` settings page. The local network you created should appear here. Connect to it.
8. The app should now be accessible at your Private IP address (e.g.) `http://192.168.0.0:9100`. You may need to append `/#/` onto the url if you are not automatically redirected.

### To IBM Cloud Foundry (for accessing the client site on any internet device connected to the internet)

1. Set up your [IBM Cloud Foundry](https://www.ibm.com/cloud/cloud-foundry) account.
2. In `client/src/config/index.js`, set the cloud config to your Cloud Foundry address.
3. Set up a [Cloudant database on IBM Cloud](https://cloud.ibm.com/catalog/services/cloudant).
4. In `server/src/config/index.js`, set that your database is located on the cloud. Ensure you have specified your login details in `server/src/config/index.js` or a `.env` file.
5. `npm run deploy:cloud`


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

- [James Cockbain](https://github.com/jcockbain)
- [Craig Forrest](https://github.com/CForrest97)
- [Liam Hampton](https://github.com/liamchampton)
- [Richard Waller](https://github.com/rwalle61)
- [Michael Westerby](https://github.com/mwesterby)

## Acknowledgments

- Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
- Inspired by Red Cross's [*Trace the Face* reunification project](https://familylinks.icrc.org/europe/en/Pages/Home.aspx) and [everyone's favorite guessing game](https://en.wikipedia.org/wiki/Guess_Who%3F)
