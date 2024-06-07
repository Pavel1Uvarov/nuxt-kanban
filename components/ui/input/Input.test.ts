import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import { Input } from '.';

describe('Input', () => {
	test('render correctly', async () => {
		const wrapper = mount(Input);

		expect(wrapper.exists()).toBeTruthy();
		expect(wrapper.find('input').exists()).toBeTruthy();
	});

	test('Input with attrs', async () => {
		const wrapper = mount(Input, {
			props: {
				type: 'text',
				placeholder: 'placeholder',
				defaultValue: 'value',
				disabled: false,
				readonly: false,
				autofocus: false,
			},
		});

		expect(wrapper.find('input').attributes('type')).toBe('text');
		expect(wrapper.find('input').attributes('placeholder')).toBe('placeholder');
		expect(wrapper.find('input').element.value).toBe('value');
		expect(wrapper.find('input').attributes('disabled')).toBeFalsy();
		expect(wrapper.find('input').attributes('readonly')).toBeFalsy();
		expect(wrapper.find('input').attributes('autofocus')).toBeFalsy();
	});
});
