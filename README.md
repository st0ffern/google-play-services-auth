# google-play-services-auth
[![](https://img.shields.io/npm/v/google-play-services-auth.svg)](https://www.npmjs.com/package/google-play-services-auth) 
[![David](https://img.shields.io/david/stoffern/google-play-services-auth.svg?maxAge=2592000)]() 
[![Travis](https://img.shields.io/travis/stoffern/google-play-services-auth.svg?maxAge=2592000)]() 
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Authentication module for Google Play Services for NodeJs


###Example
```js
import GooglePSAuth from 'google-play-services-auth'


var Auth = new GooglePSAuth({
  android_id: '9774d56d682e549c',   // Android ID
  app: 'com.nianticlabs.pokemongo',  // App name
  client_sig: '321187995bc7cdc2b5fc91b11a96e2baa8602c62',  //Client signature
  service: 'audience:server:client_id:848232511240-7so421jotr2609rmqakceuu1luuq0ptb.apps.googleusercontent.com', //OAuth service link
})

async funtion init(){
  try{
    var user = Auth.login(email, password)
    var user2 = Auth.login(email2, password2)
    var user3 = Auth.login(email3, password3)
  }catch(err){
    console.log(err)
  }

}
init().catch(err => console.log(err))


```

### User object

```js
{
    email               // This user`s email
    password            // This user`s password
    app                 // Application id
    android_id          // Application android id
    client_sig          // Application signature id
    service             // Application OAuth service URL
    has_permission      // Should application have permission? (default: 1)
    add_account         // Add account to application data? (default: 1)
    source              // Device type (default: android)
    device_country      // Device country (default: us)
    operatorCountry     // Device operator country (default: us)
    lang                // Device language (default: en)
    sdk_version         // Device SDK version (default: 17)
    user_agent          // Device agent (default: 'Dalvik/2.1.0 (Linux U Android 5.1.1 Andromax I56D2G Build/LMY47V')
    isLogged            // is user logged? (default: false)

    // params recieved from authentication
    Auth                    // Master auth token
    issueAdvice             // default auto, unknown function?
    Expiry                  // date of token expiry.
    storeConsentRemotely    // Store data externally.

    //Dont touch
    auth_url            // Google auth path        
}
```