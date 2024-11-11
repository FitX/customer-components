
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxAutoSuggest } from './fitx-auto-suggest.vue';
import type { AutoSuggestOption } from './types';
import ContentDe from './readme.de.md?raw';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation';
import { onMounted, ref } from 'vue';

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

interface StudioResponse {
  name: string,
  branchId: number,
}

const demoResponse: StudioResponse[] = [
  {
    "name": "Aachen-Europaplatz",
    "branchId": 38
  },
  {
    "name": "Arnsberg",
    "branchId": 106
  },
  {
    "name": "Augsburg-Lechhausen",
    "branchId": 98
  },
  {
    "name": "Berlin-Alexanderplatz",
    "branchId": 37
  },
  {
    "name": "Berlin-Biesdorf",
    "branchId": 100
  },
  {
    "name": "Berlin-East Side Mall",
    "branchId": 82
  },
  {
    "name": "Berlin-Hellersdorf",
    "branchId": 61
  },
  {
    "name": "Berlin-Ku'damm",
    "branchId": 24
  },
  {
    "name": "Berlin-Landsberger Allee",
    "branchId": 89
  },
  {
    "name": "Berlin-Moabit",
    "branchId": 91
  },
  {
    "name": "Berlin-Schöneberg",
    "branchId": 57
  },
  {
    "name": "Berlin-Spandau",
    "branchId": 132
  },
  {
    "name": "Berlin-Südkreuz",
    "branchId": 48
  },
  {
    "name": "Berlin-Tempelhof",
    "branchId": 56
  },
  {
    "name": "Berlin-Tierpark",
    "branchId": 135
  },
  {
    "name": "Berlin-Waidmannslust",
    "branchId": 29
  },
  {
    "name": "Bielefeld-Mitte",
    "branchId": 102
  },
  {
    "name": "Bielefeld-Sieker",
    "branchId": 26
  },
  {
    "name": "Bochum-Harpen",
    "branchId": 66
  },
  {
    "name": "Bochum-Innenstadt",
    "branchId": 34
  },
  {
    "name": "Bochum-Riemke",
    "branchId": 32
  },
  {
    "name": "Bochum-Wattenscheid",
    "branchId": 17
  },
  {
    "name": "Bonn-Duisdorf",
    "branchId": 94
  },
  {
    "name": "Bottrop-Stadtmitte",
    "branchId": 78
  },
  {
    "name": "Bremen-Mitte",
    "branchId": 51
  },
  {
    "name": "Bremen-Oslebshausen",
    "branchId": 54
  },
  {
    "name": "Bremen-Walle",
    "branchId": 74
  },
  {
    "name": "Bremerhaven-Geestemünde",
    "branchId": 75
  },
  {
    "name": "Chemnitz-Kaßberg",
    "branchId": 69
  },
  {
    "name": "Dorsten",
    "branchId": 122
  },
  {
    "name": "Dortmund-Kley",
    "branchId": 40
  },
  {
    "name": "Dortmund-Nordstadt",
    "branchId": 13
  },
  {
    "name": "Dortmund-Phoenix See",
    "branchId": 25
  },
  {
    "name": "Dresden-Freiberger Straße",
    "branchId": 101
  },
  {
    "name": "Duisburg-Hafen",
    "branchId": 129
  },
  {
    "name": "Duisburg-Hamborn",
    "branchId": 84
  },
  {
    "name": "Duisburg-Mitte",
    "branchId": 109
  },
  {
    "name": "Duisburg-Rheinhausen",
    "branchId": 60
  },
  {
    "name": "Düren-Birkesdorf",
    "branchId": 39
  },
  {
    "name": "Düsseldorf-Derendorf",
    "branchId": 15
  },
  {
    "name": "Düsseldorf-Flingern",
    "branchId": 16
  },
  {
    "name": "Düsseldorf-Holthausen",
    "branchId": 47
  },
  {
    "name": "Düsseldorf-Lörick",
    "branchId": 33
  },
  {
    "name": "Erfurt-Daberstedt",
    "branchId": 116
  },
  {
    "name": "Essen-Bergerhausen",
    "branchId": 19
  },
  {
    "name": "Essen-Limbecker Platz",
    "branchId": 70
  },
  {
    "name": "Essen-Nordviertel",
    "branchId": 11
  },
  {
    "name": "Fürth-Hardhöhe",
    "branchId": 76
  },
  {
    "name": "Gelsenkirchen-Erle",
    "branchId": 111
  },
  {
    "name": "Gelsenkirchen-Heßler",
    "branchId": 27
  },
  {
    "name": "Gelsenkirchen-Mitte",
    "branchId": 105
  },
  {
    "name": "Gießen-Innenstadt",
    "branchId": 90
  },
  {
    "name": "Gladbeck-Mitte",
    "branchId": 88
  },
  {
    "name": "Grevenbroich",
    "branchId": 118
  },
  {
    "name": "Gütersloh-Innenstadt",
    "branchId": 71
  },
  {
    "name": "HQ2",
    "branchId": 4
  },
  {
    "name": "Hagen-Mitte",
    "branchId": 62
  },
  {
    "name": "Hamburg-Airport",
    "branchId": 46
  },
  {
    "name": "Hamburg-Altona",
    "branchId": 134
  },
  {
    "name": "Hamburg-Bahrenfeld",
    "branchId": 80
  },
  {
    "name": "Hamburg-Steilshoop",
    "branchId": 45
  },
  {
    "name": "Hamburg-Wandsbek",
    "branchId": 95
  },
  {
    "name": "Hamm-Mitte",
    "branchId": 14
  },
  {
    "name": "Hannover-Vahrenheide",
    "branchId": 22
  },
  {
    "name": "Herten",
    "branchId": 125
  },
  {
    "name": "Hilden",
    "branchId": 123
  },
  {
    "name": "Iserlohn-Seilersee",
    "branchId": 42
  },
  {
    "name": "Jena-Burgau",
    "branchId": 81
  },
  {
    "name": "Kaiserslautern-Innenstadt",
    "branchId": 128
  },
  {
    "name": "Karlsruhe-Oststadt",
    "branchId": 126
  },
  {
    "name": "Kiel Gaarden-Süd",
    "branchId": 31
  },
  {
    "name": "Koblenz-Lützel",
    "branchId": 124
  },
  {
    "name": "Krefeld-Inrath",
    "branchId": 112
  },
  {
    "name": "Krefeld-Oppum",
    "branchId": 30
  },
  {
    "name": "Leipzig Mockau-Süd",
    "branchId": 41
  },
  {
    "name": "Leipzig-Neulindenau",
    "branchId": 103
  },
  {
    "name": "Ludwigshafen-Nord",
    "branchId": 44
  },
  {
    "name": "Lübeck-St. Lorenz Nord",
    "branchId": 43
  },
  {
    "name": "Magdeburg-Sudenburg",
    "branchId": 49
  },
  {
    "name": "Mainz-Hechtsheim",
    "branchId": 99
  },
  {
    "name": "Minden-Innenstadt",
    "branchId": 97
  },
  {
    "name": "Mönchengladbach-Rheydt",
    "branchId": 67
  },
  {
    "name": "Mönchengladbach-Waldhausen",
    "branchId": 21
  },
  {
    "name": "Mülheim-Stadtmitte",
    "branchId": 77
  },
  {
    "name": "München Schwabing-Freimann",
    "branchId": 35
  },
  {
    "name": "München Sendling-Westpark",
    "branchId": 53
  },
  {
    "name": "München-Lenbachplatz",
    "branchId": 108
  },
  {
    "name": "München-Neuperlach",
    "branchId": 65
  },
  {
    "name": "Münster-Berg Fidel",
    "branchId": 12
  },
  {
    "name": "Münster-Kinderhaus",
    "branchId": 64
  },
  {
    "name": "Neuss-Innenstadt",
    "branchId": 79
  },
  {
    "name": "Neuss-Innenstadt",
    "branchId": 110
  },
  {
    "name": "Nürnberg-Maxfeld",
    "branchId": 127
  },
  {
    "name": "Nürnberg-Zabo",
    "branchId": 55
  },
  {
    "name": "Oberhausen-Marienviertel",
    "branchId": 20
  },
  {
    "name": "Osnabrück-Fledder",
    "branchId": 18
  },
  {
    "name": "Paderborn-Südring",
    "branchId": 130
  },
  {
    "name": "Ratingen-West",
    "branchId": 50
  },
  {
    "name": "Regensburg-Reinhausen",
    "branchId": 131
  },
  {
    "name": "Remscheid-Süd",
    "branchId": 104
  },
  {
    "name": "Rostock-Südstadt",
    "branchId": 58
  },
  {
    "name": "Saarbrücken-St. Johann",
    "branchId": 87
  },
  {
    "name": "Siegen-Mitte",
    "branchId": 28
  },
  {
    "name": "Speyer",
    "branchId": 119
  },
  {
    "name": "Testlabor",
    "branchId": 2046
  },
  {
    "name": "Teststudio",
    "branchId": 1
  },
  {
    "name": "Teststudio eFitness",
    "branchId": 2045
  },
  {
    "name": "Teststudio eFitness",
    "branchId": 2047
  },
  {
    "name": "Troisdorf-Mitte",
    "branchId": 96
  },
  {
    "name": "Ulm",
    "branchId": 133
  },
  {
    "name": "Unna",
    "branchId": 117
  },
  {
    "name": "Viersen",
    "branchId": 121
  },
  {
    "name": "Wetzlar",
    "branchId": 107
  },
  {
    "name": "Witten-Mitte",
    "branchId": 86
  },
  {
    "name": "Worms-Innenstadt Süd",
    "branchId": 52
  },
  {
    "name": "Wuppertal-Barmen",
    "branchId": 36
  },
  {
    "name": "Wuppertal-Langerfeld",
    "branchId": 23
  },
  {
    "name": "Wuppertal-Vohwinkel",
    "branchId": 114
  }
];

const demoGetAllStudios = () :Promise<StudioResponse[]> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(demoResponse);
  }, 1000)
});

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/auto-suggest',
  component: FitxAutoSuggest,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        //story: ComponentDescription,
        component: ComponentDescription,
      },
    },
  },
  args: {
    options: [],
    label: 'AutoSuggest',
    name: 'auto-suggest',
  },
} satisfies Meta<typeof FitxAutoSuggest>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    // text: 'This is an error message',
  },
};

export const StudioSearch: Story = {
  args: {
    name: 'studio-search',
  },
  render: (args) => ({
    components: {
      FitxAutoSuggest,
    },
    setup() {
      const options = ref<AutoSuggestOption[]>([]);
      const searchTerm = ref('');
      const search = async () => {
        const response = await demoGetAllStudios();
        options.value = response
          .sort((a, b) => a.branchId - b.branchId)
          .map((studio) => ({
          text: `${studio.branchId} ${studio.name}`,
          value: studio.branchId,
        }));
      };
      onMounted(() => {
        search();
      })
      return {
        searchTerm,
        options,
        search,
        args
      }
    },
    template: '<fitx-auto-suggest v-bind="args" label="Studio suchen" :options="options" v-model="searchTerm" />'
  })
};
