import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background: #61dafb;
  color: #fff;
  padding: 10px;
  margin: 5px;
  border: none;
  cursor: pointer;
`;

const Button = ({ label, onClick }) => {
  return <ButtonWrapper onClick={onClick}>{label}</ButtonWrapper>;
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
