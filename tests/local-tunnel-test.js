const https = require('https');
const lambdaRestClient = require('@lambdatest/node-rest-client');

const lambdaCredentials = {
  username: process.env.LT_USERNAME,
  accessKey: process.env.LT_ACCESS_KEY,
};
const lambdaAutomationClient = lambdaRestClient.AutomationClient(
  lambdaCredentials,
);
module.exports = {
  '@tags': ['test'],
  'Glocal test for craftsman implementation': function (client) {
    client
      .url('http://localhost:6006/iframe.html?id=components-buttons-textbutton--default-button&viewMode=story')
      .waitForElementPresent('body', 10000)
      .assert.containsText('[class="btn__text"]', 'Button')
      .end();
  },
  after(browser) {
    console.log('Closing down...');
  },
  afterEach(client, done) {
    if (
      process.env.LT_USERNAME
      && process.env.LT_ACCESS_KEY
      && client.capabilities
      && client.capabilities['webdriver.remote.sessionid']
    ) {
      lambdaAutomationClient.updateSessionById(
        client.capabilities['webdriver.remote.sessionid'],
        { status_ind: client.currentTest.results.failed ? 'failed' : 'passed' },
        (error, session) => {
          console.log(error);
          if (!error) {
            client.pause(10000);
            done();
          }
        },
      );
    } else {
      client.pause(10000);
      done();
    }
  },
};
