<template>
  <div id="app">
    <h1>Playground for testing different Exports</h1>
    <base-button text="base button" />
    <hr>
    <error-message errorMessage="Test" />
    <hr>
    <base-input label="base input" />
    <hr>
    <text-button text="text button" />
    <hr>
    <base-option>base option</base-option>
    <hr>
    <base-option-form>base option form</base-option-form>
    <hr>
    <date-input label="date input" />
    <hr>
    <base-textarea label="text area" />
    <hr>
    <base-checkbox label="checkbox" />
    <hr>
    <base-radio label="radio" />
    <hr>
    <filter-chip label="Filter Chip" value="foo" />
    <hr>
    <div style="display: grid; grid-template-columns: 1fr 1fr">
      <base-input v-model="model" label="base input"></base-input>
      <base-textarea v-model="model" label="base input" />
    </div>
    <hr>
    <info-box content="Blubb Lorem Ipsum" />
    <hr>
    <base-banner content="Blubb Lorem Ipsum" modifier="attention" />
    <hr>
    <progress-bar :steps="['eins', 'zwei']" />
    <hr>
    <requirements-list :items="[{ title: 'eins', done: false }, { title: 'zwei', done: true }]" />
    <hr>
    <slot-select :items="demoSlots3" />
  </div>
</template>

<script>
/* eslint-disable */
import '../dist/customer-components.css';

export default {
  name: 'App',
  data() {
    return {
      model: null,
      demoSlots3: [
        {
          title: 'title 1',
          sub: 'sub 1',
          slots: [
            'slot 1',
            'slot 2',
          ]
        },
        {
          title: 'title 2',
          disabled: true,
          sub: 'sub 2',
          slots: [
            'slot 1',
            'slot 2',
          ]
        },
        {
          title: 'title 3',
          sub: 'sub 3',
          slots: [
            'slot 1',
            'slot 2',
          ]
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
#app {
  box-sizing: border-box;
  font-family: var(--font-stack-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 2rem;
  color: #2c3e50;
  margin-top: 60px;
}
hr {
  margin: 4rem 0;
}
</style>
