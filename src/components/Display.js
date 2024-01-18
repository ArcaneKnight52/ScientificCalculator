import React from 'react';
import styled from 'styled-components';

const DisplayWrapper = styled.div`
    background: #f0f0f0;
    padding: 10px;
    font-size: 24px;
    text-align: right;
    `;

    const Display = ({ value }) => {
        return <DisplayWrapper>{value}</DisplayWrapper>;
    };

    export default Display;