command_exists () {
    type "$1" &> /dev/null ;
}

if command_exists meteor ; then
  echo "Meteor already installed."
else
  echo "Installing Meteor."
  curl https://install.meteor.com/ | sh
fi

cf login -a https://api.18f.gov -u $IAA_MVP_CF_USER -p $IAA_MVP_CF_PASSWORD  -o agile-bpa -s production
cf push