<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TextButton } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  TextButton,
  // }
});
</script>

<template>
  <div id="app">
    <text-button text="hallo" />
  </div>
</template>
