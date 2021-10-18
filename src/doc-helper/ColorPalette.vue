<template>
  <section class="demo">
    <h2>Primäre Farben</h2>
    <p>Unsere primären Markenfarben sind Anthracite, Blue und Orange.</p>
    <ul>
      <li>Anthracite und Blue eher im Hintergrund</li>
      <li>Orange als Akzent (z.B. Buttons, Links, Infos)</li>
      <li>Weiß als Hintergrund für textlastige Seiten und Formulare</li>
    </ul>
    <color-list :colors="primaryColors" />
  </section>

  <section class="demo">
    <h2>Sekundäre Farben</h2>
    <p>Um Ebenen zu schaffen und Bereiche Abzugrenzen gibt es Abstufungen der Primären Farben.</p>
    <h3>Anthrazitabstufungen</h3>
    <color-list :colors="anthraciteColors" />
    <h3>Orangeabstufungen</h3>
    <color-list :colors="orangeColors" />
    <h3>Weißabstufungen</h3>
    <color-list :colors="whiteColors" />
  </section>

  <section class="demo">
    <h1>Grauabstufungen</h1>
    <p>Für Inhalte z.B.</p>
    <ul>
      <li>Textebenen</li>
      <li>Linien</li>
      <li>Buttons</li>
      <li>Zustände</li>
    </ul>
    <color-list :colors="grayColors" />
  </section>

  <section class="demo">
    <h1>Funktionale Farben</h1>
    <ul>
      <li>Funktionalfarben nach Ampelsystem</li>
      <li>Für Benachrichtigungen, Warnungen und Statusmeldungen</li>
      <li>Für Typografie wird der leuchtende Farbcode verwendet. Für Hintergründe jeweils angepasste Varianten</li>
      <li>Grün = Erfolgreich / Positiv</li>
      <li>Gelb = (Neutrale)  Aufmerksamkeit</li>
      <li>Rot = Fehler / Negativ</li>
    </ul>
    <color-list :colors="funcColors" />
  </section>

  <!--
  <section class="demo">
    <h1>All Colors:</h1>
    <color-list :colors="colors" />
  </section>
  -->
</template>

<script>
import { useColor } from '@/doc-helper/useColors';
// import { onMounted, ref } from 'vue';
import ColorList from './ColorList.vue';

export default {
  components: {
    ColorList,
  },
  setup() {
    const {
      colors,
      primaryColors,
      secondaryColors,
      anthraciteColors,
      orangeColors,
      whiteColors,
      grayColors,
      funcColors,
    } = useColor();
    return {
      colors,
      primaryColors,
      secondaryColors,
      anthraciteColors,
      orangeColors,
      whiteColors,
      grayColors,
      funcColors,
    };
  },
};
</script>

<style scoped lang="scss">
.demo {
  margin-bottom: 4rem;
  p {
    max-width: 60ch;
  }
}
</style>
