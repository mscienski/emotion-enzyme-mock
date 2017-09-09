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

const P = () => (
    <p>Component To Be Styled</p>
);

const StyledP = styled(P)`
    font-size: 16px;
`;

const StyledFooter = styled('footer')`
    color: ${whiteIsh};
    margin-top: 10px;
`;

const Title = styled.div`
    font: normal ${normalFontNumber}${normalFontUnit} 'sans-serif';
`;

const Component = () => (
    <div className={container}>
        <Title />
        <StyledP />
        <StyledFooter />
    </div>
);

export default Component;
export {
    container,
    StyledFooter,
    StyledP,
    Title
};
