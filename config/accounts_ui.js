if (Meteor.isClient) {
  Accounts.ui.config({
    requestPermissions: {
      github: ['repo', 'read:org']
    }
  });
}
