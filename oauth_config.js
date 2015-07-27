if (Meteor.isServer) {
  var inDevelopment = function () {
    return process.env.NODE_ENV === "development";
  };

  var inProduction = function () {
    return process.env.NODE_ENV === "production";
  };
    
  if (inDevelopment) {
    ServiceConfiguration.configurations.upsert(
      { service: "github" },
      {
        $set: {
          clientId: Meteor.settings.github.clientId,
          loginStyle: "popup",
          secret: Meteor.settings.github.secret
        }
      }
    );
  }

  if (inProduction) {
    var vcap_services = JSON.parse(process.env.VCAP_SERVICES)
    ServiceConfiguration.configurations.upsert(
      { service: "github" },
      {
        $set: {
          clientId: process.env.GITHUB_CLIENT_ID,
          loginStyle: "popup",
          secret: process.env.GITHUB_SECRET
        }
      }
    );
  }
}