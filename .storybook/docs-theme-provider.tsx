import { type DocsContextProps, DocsContainer, Story } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import { type PropsWithChildren } from 'react';
import * as React from 'react';
import { createTheme } from '../utils/create-custom-theme'
import { default as ColorsRaw } from '../src/assets/styles/colors.css?raw';
import { addons } from '@storybook/manager-api';

console.log('ColorsRaw', typeof ColorsRaw);



export function ThemedContainer(props: PropsWithChildren<{ context: DocsContextProps }>) {
  const storybookFitxThemeDark = createTheme('dark', ColorsRaw);
  const storybookFitxThemeLight = createTheme('light', ColorsRaw);
  /**
   * Decorator function for theming the Docs Pages.
   * The '@storybook/addon-themes' addon only updates the Story Pages.
   * When switching to the Doc Pages, the data-theme attribute is only sporadically updated.
   * Therefore, the manual update here in the Theme Provider
   */
  const theme = (props.context as any).store.globals.globals.theme;
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem('data-theme', theme);

  console.log('storybookFitxThemeDark', storybookFitxThemeDark)
  console.log('storybookFitxThemeLight', storybookFitxThemeLight)

  addons.getChannel().emit('HALLO_WELT', theme)


  return (
    <DocsContainer
      context={props.context}
      data-later-add-custom-theme={theme === 'dark' ? themes.dark : themes.light}
      theme={theme === 'dark' ? storybookFitxThemeDark : storybookFitxThemeLight}
      data-theme={theme}
    ><div className={'custom-docs-content'}>{props.children}</div></DocsContainer>
  )
}
/* vielleicht auf dom ebene prüfen ob data-theme schon existiert */
