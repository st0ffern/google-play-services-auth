# google-play-services-auth
[![](https://img.shields.io/npm/v/google-play-services-auth.svg)](https://www.npmjs.com/package/google-play-services-auth) 
[![David](https://img.shields.io/david/stoffern/google-play-services-auth.svg?maxAge=2592000)]() 
[![Travis](https://img.shields.io/travis/stoffern/google-play-services-auth.svg?maxAge=2592000)]() 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Authentication module for Google Play Services for NodeJs


###Example
```js
import GooglePSAuth from 'google-play-services-auth'

let auth = new GoolePSAuth({
  email: 'dummy@email.com',
  password: 'notValid',
  android_id: '9774d56d682e549c',
  app: 'com.nianticlabs.pokemongo',
  client_sig: '321187995bc7cdc2b5fc91b11a96e2baa8602c62',
  service: 'audience:server:client_id:848232511240-7so421jotr2609rmqakceuu1luuq0ptb.apps.googleusercontent.com',
})

Auth.login()
.then(masterToken => {
    console.log('do something with Token')
})
```