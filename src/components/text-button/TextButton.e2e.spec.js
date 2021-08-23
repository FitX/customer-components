describe('local test', () => {
  before((client) => client.url('http://localhost:6006/iframe.html?id=buttons-textbutton--default-button&viewMode=story'));
  test('demo', (client) => {
    client
      .waitForElementPresent('body', 10000)
      .assert.containsText('[class="btn__text"]', 'Button')
      .end();
  });
  after((client) => client.end());
});
