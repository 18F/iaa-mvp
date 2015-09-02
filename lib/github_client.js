var userIsOrgMember = function(orgId, ghUsername) {
  var ghApiKeys = {
    client_id: ApiKeys.github.clientId(),
    client_secret: ApiKeys.github.clientSecret()
  };
  var url = 'https://api.github.com/organizations/' + orgId + '/public_members/' + ghUsername;
  var options = {
    params: ghApiKeys,
    headers: {'User-Agent': 'IAA Form Filler'}
  };
  var response = HTTP.get(url, options);
  var statusCode = response.statusCode;

  // GitHub returns 204 when the user is part of the org
  return statusCode === 204;
};

var permittedOrgs = {
  '18F': '6233994'
};

if (Meteor.isServer) {
  GithubClient = {
    userIsMemberOfPermittedOrg: function(ghUsername) {
      var orgs = _.keys(permittedOrgs);
      
      var orgsArray = _.map(orgs, function(key) {
        var orgId = permittedOrgs[key];
        return lodash.curry(userIsOrgMember)(orgId)(ghUsername);
      });
      
      return _.contains(orgsArray, true);
    },
    permittedOrgsThatUserIsMemberOf: function(ghUsername) {
      var result = [];
      var orgs = _.keys(permittedOrgs);
      
      _.each(orgs, function(key) {
        var orgId = permittedOrgs[key];
        var isMember = lodash.curry(userIsOrgMember)(orgId)(ghUsername);
        if (isMember) {
          result.push(key);
        }
      });
      
      return result;
    }
  }; 
}
