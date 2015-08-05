# iaa-mvp

A minimum viable product for filling out IAAs.

Very much in alpha.

## Milestones

### Milestone 1

- ~~Stand up site on Cloud Foundry~~
- ~~CRUD for Form 7600A~~

### Milestone 2

- CRUD for Form 7600B
- Stretch goal: generate the actual PDF (move to milestone 2 if not accomplished)

### Milestone 3

- Integrate with client-facing forms

## Under the hood

It's just Meteor.

To run locally, have the GitHub API set up, and run:

```bash
meteor run --settings /config/settingsDev.json
```

### GitHub API

This applicatioh uses the `accounts-ui` and `accounts-github` Meteor packages to handle logins (meaning you log in with your GitHub account). 

To run this app locally, copy `config/settingsDev.json.sample` (rename to `settingsDev.json`) and add the appropriate API keys.

## Deployment

See devops for Cloud Foundry help/setup if you don't have an account (18F staff only).

### Initial setup

Clone the repo, and run `cf push` to intialize your application. The deploy will likely fail, but that is ok.

Create a GitHub application and set the following environment variables:

```bash
cf set-env iaa-mvp GITHUB_CLIENT_ID thegithubclientid
cf set-env iaa-mvp GITHUB_SECRET thegithubsecret
```

Ensure you have access to MongoDB by running `cf marketplace`. If you don't, contact #devops in Slack. The output should look like:

```bash
service             plans                                    description   
elasticsearch       free                                     Elasticsearch search service   
elasticsearch-new   free                                     Elasticsearch 1.5 service for application development and testing   
mongodb-new         free                                     MongoDB service for application development and testing   
postgresql          default                                  PostgreSQL database   
rds                 shared-psql, micro-psql*, medium-psql*   RDS Database Broker   
```

Here, we're using the `mongodb-new` service. To see the plans, run `cf marketplace -s mongodb-new`, which returns:

```
service plan   description   free or paid   
free           medium        free   
```

There's only one plan, `free`, which is what we'll use here. Create the service:

```bash
cf create-service mongodb-new free iaa-mongo
```

Then bind the service:

```bash
cf bind-service iaa-mvp iaa-mongo
```

Finally, restage:

```bash
cf restage iaa-mvp
```

### Deploy

```bash
cf push
```

## Tour of the codebase

This is all subject to change fairly rapidly, but this is the current state of codebase organization:

- `client`: contains static assets such as CSS files and images.
- `config`: contains configuration and `routes.js`. `routes.js` uses the [Iron Router](https://github.com/iron-meteor/iron-router) to define routes along with some lightweight controllers.
- `lib`: contains utility code that could be used anywhere else in the codebase. Ideally it should be completely application-agnostic. For example, right now it has only `us_states.js`, a Javascript object that has a list of US states and their two-letter abbreviations. This is used to populate select boxes in our forms.
- `models`: contains our models. Model files should include the [Mongo Collection](https://docs.meteor.com/#/full/mongo_collection) definition, CRUD operations, Meteor [publishing](https://docs.meteor.com/#/full/meteor_publish) code, and [`allow`](https://docs.meteor.com/#/full/allow)/`deny` logic.
- `views`: contains HTML templates and client-side UI logic. Subfolders such as 'form7600a' and `index` will contain a main HTML template along with `events.js`, `helpers.js`, and `rendered.js` files. `events.js` is home to code that responds to events such as form submissions. `helpers.js` makes functions available inside of HTML templates. `rendered.js` is home to code that executes once the template is rendered. This would be a good place to store custom JQuery that would normally wait for `$(document).ready()`. Other HTML files in the `views` folder are somewhat more miscellaneous, such as the layout template, the 404 page, and a helper for selecting US states in an HTML select tag.

When in doubt, read the [Meteor docs](https://docs.meteor.com/#/full/).



