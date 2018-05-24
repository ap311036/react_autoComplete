import { resolve } from 'path';

let sourcePath;

const soucreConfig = {
    'dev': {
        'flightSeo': {
            'dtm': resolve(__dirname, './json/flightsInternationalDestinationCsutomMenu.js'),
            'act': resolve(__dirname, './json/GetArrayTkt6.js'),
            'noPreferTrans': resolve(__dirname, './json/country.json')
        },
        'hotelSeo': {
            'dtm': resolve(__dirname, './json/hotelCustomMenu.json'),
            'act': resolve(__dirname, './json/source2.json'),
        }
    },
    'prod': {
        'flightSeo': {
            'dtm': './json/flightsInternationalDestinationCsutomMenu.js',
            'act': './json/GetArrayTkt6.js',
            'noPreferTrans': './json/country.json'
        },
        'hotelSeo': {
            'dtm': './json/hotelCustomMenu.json',
            'act': './json/source2.json',
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    sourcePath = soucreConfig.prod;
} else {
    sourcePath = soucreConfig.dev;
}


export const flightSeoPathConfig = sourcePath.flightSeo;
export const hotelSeoPathConfig = sourcePath.hotelSeo;
export default sourcePath;