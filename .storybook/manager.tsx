import React from 'react';
import { addons, useArgs, useGlobals, useGlobalTypes, types } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';
import { OutlineIcon } from '@storybook/icons';
import fitxTheme from './fitx-theme';
import { FORCE_RE_RENDER, UPDATE_STORY_ARGS, STORY_CHANGED } from '@storybook/core-events'

addons.setConfig({
  theme: fitxTheme,
});

const ADDON_ID = 'myaddon';
const PANEL_ID = `${ADDON_ID}/toolbar`;

let init = false;
const add = {};

add?.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.TOOL,
    title: 'My Addon',
    match: ({ tabId, viewMode }) => !tabId && viewMode === 'story',
/* render: ({ active }) => {
  const [args, updateArgs] = useArgs();
  const [globals, updateGlobals] = useGlobals();
  const globalTypes = useGlobalTypes();
  console.log('args', args);
  console.log('glob', globals);
  console.log('globalTypes', globalTypes);
  return (<>
    <IconButton active={active} title="Show a Storybook toolbar">
      light
      <OutlineIcon />
    </IconButton>
    <IconButton active={active} title="Show a Storybook toolbar">
      dark
      <OutlineIcon />
    </IconButton>
  </>)
},*/
    render: () => {
      const [globals, updateGlobals] = useGlobals();
      const handleUpdateAgs = (e) => {
        console.log('UPDATE_STORY_ARGS')
        updateGlobals({
          theme: e.updatedArgs.theme,
        });
        console.log('api', api)
        // addons.getChannel().emit(FORCE_RE_RENDER);
      };

      if (!init) {
        console.log('init');
        api.on(UPDATE_STORY_ARGS, handleUpdateAgs);

        api.on(STORY_CHANGED, () => {
          console.log('blubb', api.getGlobals())
          api.updateStoryArgs(api.getCurrentStoryData(), { theme: api.getGlobals().theme})
        });
        // addons.getChannel().on(UPDATE_STORY_ARGS, handleUpdateAgs);
        init = true;
      }

      // foo()

      // addons.getChannel().removeAllListeners(UPDATE_STORY_ARGS);
      // addons.getChannel().emit(FORCE_RE_RENDER);
      return (<></>);
    }
})
});
