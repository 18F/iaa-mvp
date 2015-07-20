# iaa-mvp

A minimum viable product for filling our MVPs.

Very much in alpha.

## Milestones

### Milestone 1

- Stand up site on Cloud Foundry
- CRUD for Form 7600A
- Stretch goal: generate the actual PDF (move to milestone 2 if not accomplished)

### Milestone 2

- CRUD for Form 7600B

### Milestone 3

- Integrate with client-facing forms

## Under the hood

It's just Meteor.

## Deployment

See devops for Cloud Foundry help/setup if you don't have an account (18F staff only).

```
$ cf push iaa-mvp -b https://github.com/csterwa/cf-meteor-buildpack.git
```



