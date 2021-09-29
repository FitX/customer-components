<template>
  <section class="demo">
    <h1>Primäre Markenfarben</h1>
    <p>Unsere primären Markenfarben sind Weiß und Schwarz.
      Sie werden verwendet, um Zugänglichkeit, Einfachheit und Konsistenz in der gesamten
      Markenkommunikation zu gewährleisten.</p>
    <p>
      <small>
        <b>Hinweis:</b>
        Da es scheinbar Unstimmigkeiten zwischen Social Media und Design gab,
        wurde das Blau (#35484f, rgb(53,72,79)) durch das "SOME Blau" ersetzt.
      </small>
    </p>
    <color-list :colors="primaryColors" />
  </section>

  <section class="demo">
    <h1>Sekundäre Markenfarben</h1>
    <p>Da gibt es wohl nichts zu sagen.</p>
    <color-list :colors="secondaryColors" />
  </section>

  <section class="demo">
    <h1>Anthrazitabstufungen</h1>
    <p>Da gibt es wohl nichts zu sagen.</p>
    <color-list :colors="anthraciteColors" />
  </section>

  <section class="demo">
    <h1>Orangeabstufungen</h1>
    <p>Da gibt es wohl nichts zu sagen.</p>
    <color-list :colors="orangeColors" />
  </section>

  <section class="demo">
    <h1>Weißabstufungen</h1>
    <p>Da gibt es wohl nichts zu sagen.</p>
    <color-list :colors="whiteColors" />
  </section>

  <section class="demo">
    <h1>Grauabstufungen</h1>
    <p>Das sind quasi die Farben der Formulare.</p>
    <color-list :colors="grayColors" />
  </section>

  <section class="demo">
    <h1>Funktionale Farben</h1>
    <p>Da gibt es wohl nichts zu sagen.</p>
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
