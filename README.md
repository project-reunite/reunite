# Project Reunite

## Problem

Over 40,000 people are currently separated from their families by natural disasters, with that number rising every year.

Charities such as the Red Cross are trying to reunite families. Red Cross have photographed thousands of survivors and put them on a [website](https://familylinks.icrc.org/europe/en/Pages/search-persons.aspx) for refugees to look through and find their loved ones.

But checking thousands of photos one at a time is slow. Every hour spent searching means more stress and risk for vulnerable refugees in camps. The search is often slowest for refugees in the *worst* conditions, who have unstable internet, have to share computers, or can't afford the mobile data to load thousands of photos.

The longer the search, the worse the mental health of refugees.

## Solution

But what if we could speed up the search tenfold?

We're using AI to sort survivors' photos, so that we can show refugees such as Arame the photos most resembling her son first:

1. We analyse all survivors' photos using Watson Visual Recognition, extracting features such as gender and face-shape.

2. This allows Arame to select search filters such as gender.

3. It also allows Arame to narrow down the search area by choosing between 2 faces representing the same feature, such as face-shape. If the first face represents round faces, and the second represents sharp faces, then we know to narrow down the search to round faces.

By dividing the search area repeatedly, we divide Arame's search time too:

- To find her son in 5,000 photos on Red Cross' existing website, she would on average have to check half of them. That's 2,500 photos to download and scroll through. But using our website, she would on average have to check only *30*.

- And if there were 50,000 survivor's photos, she'd have to look though 25,000 of them using Red Cross' website, *yet only 40 using ours*.

So our prioritization algorithm makes searching really fast, and reunites Arame with her son quicker. Watch [our 3-minute demo](https://ibm.box.com/s/qcqnxj41ksf20uft365zxp1ryxm2xx9j) to see it in action.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Download Node.js v8 or above](https://github.com/nodejs/node#download)

### Installing and Running App

1. Clone the repo

    ```bash
    git clone git@github.ibm.com:ProjectReunite/reunite.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Run the app

    To start the full app, run from the root directory. To start only the server run from ```/server``` and likewise to run only the frontend call from ```/client```.

    ```bash
    npm start
    ```

4. Develop and test app

    The app will be available on ```http://localhost:41002```. API calls can be made to the server on ```http://localhost:9100```.

## Running the Tests

### All tests

The following command, from the root directory, will run the full test suite.

```bash
npm run test:full
```

### Integration tests

Cypress is used for end-to-end integration testing of the app, manipulating the frontend to make API calls the server and asserting the correct components are then rendered.

If the app is running, these tests can be run with the following commands.

```bash
# With Cypress UI
npm run cypress:open
# Without Cypress UI, in command line
npm run cypress:run
```

If the app is not running. The following command will start the app, run the integration tests and then clean up.

```bash
npm run test:integration
```

### Component tests

The client uses Jest to test that each of its components renders correctly in isolation.

These do not require the app to be running.

```bash
cd client
# Run all component tests
jest
# Run all component tests in watch mode
jest --watch
```

### API tests

The server uses mocha to test its API's, and will also report test coverage.

```bash
cd server
# Run all API tests
npm test
# Run all API tests, with coverage report
npm run test:coverage
```

## Built With

- IBM technologies:
  - Watson Visual Recognition
  - Cloudant Database
  - Cloud Object Storage
- [React](https://reactjs.org/docs/react-api.html#react.createelement)
- [Mineral UI](https://github.com/mineral-ui/mineral-ui)
- [Cypress](https://www.cypress.io/)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **[James Cockbain](https://github.ibm.com/James-Cockbain)**
- **[Craig Forrest](https://github.ibm.com/Craig-Forrest)**
- **[Liam Hampton](https://github.ibm.com/Liam-Hampton)**
- **[Richard Waller](https://github.ibm.com/Richard-Waller)**
- **[Michael Westerby](https://github.ibm.com/Michael-Westerby)**

## License

This project is licensed under the Apache 2 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
- Inspired by Red Cross's [Trace the Face reunification website](https://familylinks.icrc.org/europe/en/Pages/Home.aspx) and [everyone's favorite guessing game](https://en.wikipedia.org/wiki/Guess_Who%3F)
