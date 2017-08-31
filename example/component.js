import React from 'react';
import {
    css
} from 'emotion';
import styled from 'react-emotion';

const whiteIsh = '#efefef';
const threeFourthsWidth = '75vw';
const normalFontNumber = 4;
const normalFontUnit = 'em';

const anyDiv = css`
    display: block;
`;

const container = css`
    composes: ${anyDiv};
    background-color: ${whiteIsh};
    margin: 0 auto;
    max-width: ${threeFourthsWidth};
`;

const Title = styled.div`
    font: normal ${normalFontNumber}${normalFontUnit} 'sans-serif';
`;

const Component = () => (
    <div className={container}>
        <Title />
    </div>
);

export default Component;
export {
    container,
    Title
};