const chai = require('chai'); // eslint-disable-line

chai.use(require('chai-string'));

const { expect } = chai;
const { describe, it } = require('mocha');
const generateStyleString = require('../lib/generateStyleString');

describe('generateStyleString', () => {
    it('generates a style string based on arguments it receives from a string template', () => {
        const expectedStyleString = `
            background-color: #efefef;
            font: normal 4em 'sans-serif';
            width: 75vw;
        `;
        const whiteIsh = '#efefef';
        const threeFourthsWidth = '75vw';
        const normalFontNumber = 4;
        const normalFontUnit = 'em';

        const result = generateStyleString`
            background-color: ${whiteIsh};
            font: normal ${normalFontNumber}${normalFontUnit} 'sans-serif';
            width: ${threeFourthsWidth};
        `;

        expect(result)
            .to.equalIgnoreSpaces(expectedStyleString);
    });
});
