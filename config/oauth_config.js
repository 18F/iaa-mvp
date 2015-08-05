if (Meteor.isServer) {
  var inDevelopment = function() {
    return process.env.NODE_ENV === "development";
  };

  var inProduction = function() {
    return process.env.NODE_ENV === "production";
  };
  
  var inTravis = function() {
    if (process.env.TRAVIS) {
      if (process.env.TRAVIS === "true") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
    
  if (inDevelopment()) {
    ServiceConfiguration.configurations.upsert(
      { service: "github" },
      {
        $set: {
          clientId: Meteor.settings.github.clientId,
          loginStyle: "popup",
          secret: Meteor.settings.github.clientSecret
        }
      }
    );  
  }

  if (inProduction() || inTravis()) {
    ServiceConfiguration.configurations.upsert(
      { service: "github" },
      {
        $set: {
          clientId: process.env.GITHUB_CLIENT_ID,
          loginStyle: "popup",
          secret: process.env.GITHUB_CLIENT_SECRET
        }
      }
    );
  }
}