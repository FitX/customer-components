import LinkExamples from '../doc-helper/LinkExamples.vue';

export default {
  title: 'Styleguide/LinksOld',
  // component: ColorPalette,
  parameters: {
    options: {
      showPanel: false,
    },
    docs: {
      description: {
        component: `
- Zwei Varianten
- Icons optional
- Pfeil icon hinten platziert
- Flexibles Icon vorne platziert
- Variante je nach Einsatz wählbar
        `,
      },
    },
  },
};

export const Links = () => LinkExamples;

export const InfoForDevs = () => ({
  template: `
  Die Icons können per <i>vue-svg-loader</i> bzw. <i>vite-svg-loader</i> als Komponenten genutzt werden.
  Momentan werden die Icons nicht als Componenten mit ausgeliefert.
  `,
});

InfoForDevs.parameters = {
  docs: {
    description: {
      story: `Keine eigene Komponente. Links werden als [SCSS Styles mit ausgeliefert](src/assets/styles/links.scss).

## Beispiel Implementierung in der App
${(```
a:any-link {
        @include text-links();
      }
```)}`,
    },
  },
};
