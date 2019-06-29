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


So our prioritization algorithm makes searching really fast, and reunites Arame with her son quicker. Watch [our 3-minute demo](link) to see it in action.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

[Download Node.js v8 or above](https://github.com/nodejs/node#download)


### Installing

1. Clone this repo
```bash
git clone git@github.ibm.com:ProjectReunite/reunite.git
```

2. Install dependencies
```bash
npm install
```

3. Run the app
```bash
npm start ??
```

4. End with an example of getting some data out of the system or using it for a little demo
```bash
??
```

## Running the tests

Explain how to run the automated tests for this system



### End-to-end tests

Explain what these tests test and why

```bash
# copy from travis.yml
pre-test setup
npm run test:full ??
post-test teardown
```

### Unit tests ? i.e. Server and client tests?

Explain what these tests test and why

```bash
# copy from travis.yml
pre-test setup
npm run test:full ??
post-test teardown
```


### Coding style tests

Explain what these tests test and why

```
npm run test:coverage && npm run test:mutation ??
```

## Deployment

Add additional notes about how to deploy this on a live system. Is anything live yet?

## Built With

* IBM technologies:
    * Watson Visual Recognition
    * Cloudant Database
    * Cloud Object Storage
    * [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
    * [Maven](https://maven.apache.org/) - Dependency Management
    * [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [React](link)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **[James Cockbain](link to gh profile)** - *Initial work*
* **[Craig Forrest](link to gh profile)** - *Initial work*
* **[Liam Hampton](link to gh profile)** - *Initial work*
* **[Richard Waller](link to gh profile)** - *Initial work*
* **[Michael Westerby](link to gh profile)** - *Initial work*


## License

This project is licensed under the Apache 2 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* Inspired by Red Cross's [Trace the Face reunification website](https://familylinks.icrc.org/europe/en/Pages/Home.aspx) and [everyone's favorite guessing game](https://en.wikipedia.org/wiki/Guess_Who%3F)
