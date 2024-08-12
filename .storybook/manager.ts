import { addons } from '@storybook/manager-api';
import { fitxLight } from './theme';

addons.setConfig({
  theme: fitxLight
});

document.addEventListener('readystatechange', (e) => {
  console.log('e', e)
  console.log('addons', addons);
  console.log('addons', addons.getChannel()['sharedStateSet-client-storybook/themes/theme-switcher']);
  console.log('addons', addons.getChannel()['HALLO_WELT']);
  addons.getChannel().on('HALLO_WELT', (e) => {
    console.log('HALLO_WELT inside provider', e)
  });
})
