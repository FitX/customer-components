describe('BaseOption', () => {
  before((client) => client.url('http://localhost:6006/iframe.html?id=components-option--default-base-option&args=&viewMode=story'));

  it('default is clickable', (client) => {
    client
      .waitForElementPresent('button', 10000)
      .click('button');
  });

  it('default has text', (client) => {
    client
      .assert.containsText('button', 'Option');
  });

  it('default styles', (client) => {
    client
      .assert.cssProperty('button', 'background-color', 'rgba(245, 245, 245, 1)')
      .assert.cssProperty('button', 'border-radius', '8px')
      .assert.cssProperty('button', 'color', 'rgba(24, 29, 30, 1)')
      .assert.cssProperty('button', 'text-align', 'center');
  });

  it('default hover color change', (client) => {
    client
      .moveToElement('button', 0, 0)
      .assert.cssProperty('button', 'background-color', 'rgba(255, 255, 255, 1)')
      .assert.cssProperty('button', 'background-color', 'rgba(255, 255, 255, 1)')
      .assert.cssProperty('button', 'cursor', 'pointer');
  });

  after((client) => client.end());
});
