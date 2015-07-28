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

### GitHub API

This applicatioh uses the `accounts-ui` and `accounts-github` Meteor packages to handle logins (meaning you log in with your GitHub account). 

To run this app locally, copy `settingsDev.json.sample` (rename to `settingsDev.json`) and add the appropriate API keys.

## Deployment

See devops for Cloud Foundry help/setup if you don't have an account (18F staff only).

```
$ cf push
```



