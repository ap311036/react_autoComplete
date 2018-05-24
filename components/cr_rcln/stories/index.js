import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Menu from '../component.jsx'

storiesOf('Button', module)
.add('with text', () => (
	<Menu onClick={action('clicked')}>Hello Button</Menu>
))
.add('with some emoji', () => (
	<Menu onClick={action('clicked')}>😀 😎 👍 💯</Menu>
));