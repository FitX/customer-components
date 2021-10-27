// import Readme from '!raw-loader!../../coverage/lcov-report/index.html';

/**
 * Just get results table
 */
// const innerContent = Readme.replace(/^.*?<table class="coverage-summary">(.*?)<\/table>.*?$/s, '$1');

const resultsComponent = ({
  template: `
  <iframe
  style="height: 100vh; width: 100%; border: none"
  src="coverage/lcov-report/index.html"></iframe>`,
});

export default {
  title: 'Introduction/Tests',
  // component: resultsComponent,
  parameters: {
    options: {
      showPanel: false,
    },
    docs: {
      description: {
        component: 'Übersicht der Unit Tests',
      },
    },
  },
};

export const UnitTests = () => resultsComponent;
