import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import { Button } from '.';

describe('Button', () => {
	test('renders correctly', async () => {
		const wrapper = mount(Button);

		expect(wrapper.exists()).toBeTruthy();

		expect(wrapper.find('button').exists()).toBeTruthy();
	});

	test('renders button with default props', async () => {
		const wrapper = mount(Button);

		expect(wrapper.find('button').classes()).toContain('inline-flex');
		expect(wrapper.find('button').classes()).toContain('inline-flex');
	});

	test('renders button with custom variant and size', async () => {
		const wrapper = mount(Button, {
			props: {
				variant: 'default',
				size: 'default',
			},
		});

		expect(wrapper.find('button').classes()).toContain('bg-slate-900');
		expect(wrapper.find('button').classes()).toContain('h-9');
	});
});
