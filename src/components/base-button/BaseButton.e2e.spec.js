describe('BaseButton', () => {
  before((client) => client.url('http://localhost:6006/iframe.html?id=components-buttons-base-button--default-button&args=&viewMode=story'));

  it('default is clickable', (client) => {
    client
      .waitForElementPresent('button', 10000)
      .click('button');
  });

  it('default has text', (client) => {
    client
      .assert.containsText('button', 'Button');
  });

  it('default styles', (client) => {
    client
      .assert.cssProperty('button', 'background-color', 'rgba(241, 136, 65, 1)')
      .assert.cssProperty('button', 'border-radius', '26px')
      .assert.cssProperty('button', 'color', 'rgba(255, 255, 255, 1)')
      .assert.cssProperty('button', 'text-align', 'center');
  });

  it('default hover color change', (client) => {
    client
      .moveToElement('button', 2, 2)
      .assert.cssProperty('button', 'background-color', 'rgba(237, 106, 18, 1)')
      .assert.cssProperty('button', 'cursor', 'pointer');
  });

  it('Primary buttons', (client) => {
    const url = 'http://localhost:6006/iframe.html?id=components-buttons-base-button--primary-buttons&args=&viewMode=story';
    client.url(url);
    client.expect.elements('button').count.to.equal(3);

    // default
    client.expect.element('.btn').text.to.equal('Primary Button');
    client.expect.element('div > button:nth-of-type(1)').text.to.equal('Primary Button');
    client.expect.element('div > button:nth-of-type(1)').to.have.css('background-color').which.equals('rgba(237, 106, 18, 1)');
    client.expect.element('div > button:nth-of-type(1)').to.not.have.attribute('disabled');
    client.assert.cssClassPresent('div > button:nth-of-type(1)', 'btn');

    // hover
    client.expect.element('div > button:nth-of-type(2)').text.to.equal('Primary Hover');
    client.expect.element('div > button:nth-of-type(2)').to.have.css('background-color').which.equals('rgba(241, 136, 65, 1)');
    client.expect.element('div > button:nth-of-type(2)').to.not.have.attribute('disabled');
    client.assert.cssClassPresent('div > button:nth-of-type(2)', 'btn--fake-hover');

    // disabled
    client.expect.element('div > button:nth-of-type(3)').text.to.equal('Primary disabled');
    client.expect.element('div > button:nth-of-type(3)').to.have.css('background-color').which.equals('rgba(245, 245, 245, 1)');
    client.expect.element('div > button:nth-of-type(3)').to.have.attribute('disabled');
    client.assert.cssClassPresent('div > button:nth-of-type(3)', 'btn');
  });

  after((client) => client.end());
});
