# LeagueTracker [![Build Status](https://travis-ci.com/league-tracker/leaguetracker.svg?branch=master)](https://travis-ci.com/league-tracker/leaguetracker)

A backend server to track persons' matches in a league.

Access at https://leaguetracker.appspot.com/ (or by running `npm run browse` from within the directory)

## Contributing
Run locally using `npm start`

Testing
- run all tests: `npm test`
- see test coverage: `npm run test:coverage` or `npm run test:coverage:browse`
- run only unit tests: `npm run test:unit`
- run all the above: `npm run test:full`

Re-deploy (via [Google Cloud Platform App Engine](https://cloud.google.com/appengine/docs/standard/nodejs/quickstart)) using `npm run deploy`. (Uses the `gcloud` command-line tool and `app.yaml`. You will need permissions granted through [IAM in the App Engine console](https://console.cloud.google.com/iam-admin/iam?project=leaguetracker))

## License

LeagueTracker is open source software [licensed as MIT](https://github.com/league-tracker/leaguetracker/blob/master/LICENSE).
