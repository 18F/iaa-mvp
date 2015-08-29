if (Meteor.isServer) {
  ServiceConfiguration.configurations.upsert(
    { service: "github" },
    {
      $set: {
        clientId: ApiKeys.github.clientId(),
        loginStyle: "popup",
        secret: ApiKeys.github.clientSecret()
      }
    }
  );  
}