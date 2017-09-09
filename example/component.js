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

const Span = () => (
    <span>Component To Be Styled</span>
);

const StyledP = styled(Span)`
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
        <Title className="title" />
        <StyledP className="styled-span">
            <div className="sub-span" style={{ color: 'blue' }} />
        </StyledP>
        <StyledFooter className="styled-footer" />
    </div>
);

export default Component;
export {
    container,
    StyledFooter,
    StyledP,
    Title
};
