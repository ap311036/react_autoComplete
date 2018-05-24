import { configure } from '@storybook/react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

function loadStories() {
  require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);