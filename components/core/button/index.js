import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from './primary-button';
import SecondaryButton from './secondary-button';

const Button = ({ variant, ...props }) => {
  if (variant === 'primary') {
    return <PrimaryButton {...props} />;
  }

  if (variant === 'secondary') {
    return <SecondaryButton {...props} />;
  }

  return <PrimaryButton {...props} />;
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
