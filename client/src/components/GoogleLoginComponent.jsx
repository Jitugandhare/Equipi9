import React from 'react';
import { GoogleLogin as GoogleLoginOAuth } from '@react-oauth/google'; 

const GoogleLoginComponent = ({ onSuccess, onError }) => {
  return (
    <GoogleLoginOAuth
      onSuccess={onSuccess}
      onError={onError}
    />
  );
};

export default GoogleLoginComponent;
