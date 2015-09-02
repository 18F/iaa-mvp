if (Meteor.isClient) {
  Accounts.ui.config({
    requestPermissions: {
      github: ['repo', 'read:org']
    }
  });
}

if (Meteor.isServer) {  
  Accounts.onCreateUser(function(options, user) {
    var ghUsername = user.services.github.username;
    var orgs = GithubClient.permittedOrgsThatUserIsMemberOf(ghUsername);
    
    user['orgs'] = orgs;
    
    return user;
  });
  
  Accounts.validateNewUser(function(user) {
    if (!user) { return false; }

    var ghUsername = user.services.github.username;
    return GithubClient.userIsMemberOfPermittedOrg(ghUsername);
  });
  
  Accounts.validateLoginAttempt(function(attempt) {
    var user = attempt.user;
    
    if (!user) { return false; }
    
    var ghUsername = user.services.github.username;
    return GithubClient.userIsMemberOfPermittedOrg(ghUsername);
  });
}