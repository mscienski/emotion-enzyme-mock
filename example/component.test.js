import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Component, {
    container,
    Title
} from './component';
import { getStyle } from '../src';

describe('Component', () => {
    it('has a container and a Title', () => {
        const expectedContainer = `
            background-color: #efefef;
            margin: 0 auto;
            max-width: 75vw;
        `;

        const expectedTitle = `
            font: normal 4em 'sans-serif';
        `;

        const wrapper = mount(<Component />);

        expect(wrapper)
            .to.have.exactly(1).descendants(`.${container}`)
            .to.have.exactly(1).descendants(Title);

        expect(getStyle(container))
             .to.containIgnoreSpaces(expectedContainer);
        expect(getStyle(Title()))
             .to.equalIgnoreSpaces(expectedTitle);
    });
});
