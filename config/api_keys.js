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

ApiKeys = {
  github: {
    clientId: function() {
      if (inDevelopment()) {
        return Meteor.settings.github.clientId;
      }
      
      if (inProduction() || inTravis()) {
        return process.env.GITHUB_CLIENT_ID
      }
    },
    clientSecret: function() {
      if (inDevelopment()) {
        return Meteor.settings.github.clientSecret;
      }
      
      if (inProduction() || inTravis()) {
        return process.env.GITHUB_CLIENT_SECRET;
      }
    }
  }
};
