import { type DocsContextProps, DocsContainer, Story } from '@storybook/blocks';
import { themes } from '@storybook/theming';
import { type PropsWithChildren } from 'react';
import * as React from 'react';

export function ThemedContainer(props: PropsWithChildren<{ context: DocsContextProps }>) {
  /**
   * Decorator function for theming the Docs Pages.
   * The '@storybook/addon-themes' addon only updates the Story Pages.
   * When switching to the Doc Pages, the data-theme attribute is only sporadically updated.
   * Therefore, the manual update here in the Theme Provider
   */
  const theme = (props.context as any).store.globals.globals.theme;
  document.documentElement.setAttribute('data-theme', theme);

  themes.dark.textColor = '#fff';

  const isDark = (themeName) => ['dark', 'touchpoint-dark'].includes(themeName);

  return (
    <DocsContainer
      context={props.context}
      theme={isDark(theme) ? themes.dark : themes.light}
      data-theme={theme}
    ><div className={'custom-docs-content'}>{props.children}</div></DocsContainer>
  )
}
