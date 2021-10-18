<template>
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
</template>

<script>
/* eslint-disable */
// import { ErrorIcon } from 'dist/customer-components.es.js';
import '../dist/customer-components.css';
/* import {
  ErrorMessage,
  ErrorIcon,
  BaseButton,
  BaseInput,
  TextButton,
  BaseOption,
  BaseOptionForm,
  DateInput,
  BaseTextarea,
  BaseCheckbox,
  BaseRadio,
} from '../dist/customer-components.es'; */

export default {
  name: 'App',
  data() {
    return {
      model: null,
    };
  },
  /* components: {
    ErrorMessage,
    ErrorIcon,
    BaseButton,
    BaseInput,
    TextButton,
    BaseOption,
    BaseOptionForm,
    DateInput,
    BaseTextarea,
    BaseCheckbox,
    BaseRadio,
  }, */
};
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
hr {
  margin: 4rem 0;
}
</style>
