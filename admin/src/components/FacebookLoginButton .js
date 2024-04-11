import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId="1129020764898244"
      autoLoad={false}
      fields="name,email"
      callback={responseFacebook}
      textButton=""
      size="small"
      icon="fa-facebook w-100"
    />
  );
};

export default FacebookLoginButton;