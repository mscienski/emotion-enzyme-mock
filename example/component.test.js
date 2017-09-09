import React from 'react';
import { expect } from 'chai';
import {
    mount,
    render,
    shallow
} from 'enzyme';
import Component, {
    container,
    StyledFooter,
    StyledP,
    Title
} from './component';
import { getStyle } from '../lib';

describe('Test suite', () => {
    const expectedContainer = `
        background-color: #efefef;
        margin: 0 auto;
        max-width: 75vw;
    `;

    const expectedStyledFooter = `
        color: #efefef;
        margin-top: 10px;
    `;

    const expectedStyledP = `
        font-size: 16px;
    `;

    const expectedTitle = `
        font: normal 4em 'sans-serif';
    `;

    describe('Component using mount', () => {
        it('has a container, a Title, a StyledFooter, and a StyledP', () => {
            const wrapper = mount(<Component />);

            expect(wrapper)
                .to.have.exactly(1).descendants(`.${container}`)
                .to.have.exactly(1).descendants(StyledFooter)
                .to.have.exactly(1).descendants('.styled-footer')
                .to.have.exactly(1).descendants(StyledP)
                .to.have.exactly(1).descendants('.styled-p')
                .to.have.exactly(1).descendants(Title)
                .to.have.exactly(1).descendants('.title');

            expect(getStyle(container))
                .to.containIgnoreSpaces(expectedContainer);
            expect(getStyle(StyledFooter()))
                .to.equalIgnoreSpaces(expectedStyledFooter);
            expect(getStyle(StyledP()))
                .to.equalIgnoreSpaces(expectedStyledP);
            expect(getStyle(Title()))
                .to.equalIgnoreSpaces(expectedTitle);
        });
    });

    describe('Component using shallow', () => {
        it('has a container and a Title', () => {
            const wrapper = shallow(<Component />);

            expect(wrapper)
                .to.have.exactly(1).descendants(`.${container}`)
                .to.have.exactly(1).descendants(StyledFooter)
                .to.have.exactly(1).descendants('.styled-footer')
                .to.have.exactly(1).descendants(StyledP)
                .to.have.exactly(1).descendants('.styled-p')
                .to.have.exactly(1).descendants(Title)
                .to.have.exactly(1).descendants('.title');

            expect(getStyle(container))
                .to.containIgnoreSpaces(expectedContainer);
            expect(getStyle(StyledFooter()))
                .to.equalIgnoreSpaces(expectedStyledFooter);
            expect(getStyle(StyledP()))
                .to.equalIgnoreSpaces(expectedStyledP);
            expect(getStyle(Title()))
                .to.equalIgnoreSpaces(expectedTitle);
        });
    });

    describe('Component using render', () => {
        it('has a container and a Title', () => {
            const wrapper = render(<Component />);

            expect(wrapper)
                .to.have.exactly(1).descendants(`.${container}`)
                .to.have.exactly(1).descendants(`.${StyledFooter().props.className}`)
                .to.have.exactly(1).descendants('.styled-footer')
                .to.have.exactly(1).descendants(`.${StyledP().props.className}`)
                .to.have.exactly(1).descendants('.styled-p')
                .to.have.exactly(1).descendants(`.${Title().props.className}`)
                .to.have.exactly(1).descendants('.title');

            expect(getStyle(container))
                .to.containIgnoreSpaces(expectedContainer);
            expect(getStyle(StyledFooter()))
                .to.equalIgnoreSpaces(expectedStyledFooter);
            expect(getStyle(StyledP()))
                .to.equalIgnoreSpaces(expectedStyledP);
            expect(getStyle(Title()))
                .to.equalIgnoreSpaces(expectedTitle);
        });
    });
});
