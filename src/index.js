import fetch from 'node-fetch'
import formurlencoded from 'form-urlencoded'

function throwIfMissing(message) {
  throw new Error(message)
}

/**
 * Google Play Services authentication
 */
class GoogleAuth{

  constructor(props) {
    Object.assign(
      this, 
      {
        email: null,
        password: null,
        android_id: null,
        app: null,
        client_sig: null,
        has_permission: "1",
        add_account: "1",
        service: null,
        source: "android",
        device_country: "us",
        operatorCountry: "us",
        lang: "en",
        sdk_version: "17",
        auth_url: 'https://android.clients.google.com/auth',
        user_agent: 'Dalvik/2.1.0 (Linux U Android 5.1.1 Andromax I56D2G Build/LMY47V',
        currentAuth: {},
      }, 
      props
    )
  }


  /**
   * Login user with username and password
   * @return {string} Master token
   */
  async login(){
    var res = await this.getToken()
    this.currentAuth = await this.getMasterToken(res.Token)
    return this.currentAuth.Auth
  }


  /**
   * [getToken description]
   * @param  {[type]} email     [description]
   * @param  {[type]} pass      [description]
   * @param  {[type]} androidId [description]
   * @return {[type]}           [description]
   */
  async getToken(){

    var res = await this._request({
      method: 'POST', 
      body: formurlencoded({
        accountType: "HOSTED_OR_GOOGLE",
        Email: this.email,
        has_permission: this.has_permission,
        add_account: this.add_account,
        Passwd: this.password,
        service: "ac2dm",
        source: this.source,
        androidId: this.android_id,
        device_country: this.device_country,
        operatorCountry: this.operatorCountry,
        lang: this.lang,
        sdk_version: this.sdk_version,
      }),
      headers: {
        'User-Agent': this.user_agent,
        'Content-type': 'application/x-www-form-urlencoded'
      },
    })
    return res
  }

  async getMasterToken(token = throwIfMissing('Error: Google authtoken is missing')){

    if (this.app == null) throw Error('Error: App name is missing (app)')
    if (this.client_sig == null) throw Error('Error: Client Signature is missing (client_sig)')

    var res = await this._request({
      method: 'POST', 
      body: formurlencoded({
        accountType: "HOSTED_OR_GOOGLE",
        Email: this.email,
        EncryptedPasswd: token,
        has_permission: this.has_permission,
        service: this.service,
        source: this.source,
        androidId: this.android_id,
        app: this.app,
        client_sig: this.client_sig,
        device_country: this.device_country,
        operatorCountry: this.operatorCountry,
        lang: this.lang,
        sdk_version: this.sdk_version,
      }),
      headers: {
        'User-Agent': this.user_agent,
        'Content-type': 'application/x-www-form-urlencoded'
      },
    })
    return res
  }

  async _request(body){

    var res = await fetch(this.auth_url, body)

    if (res.status == 403) throw Error('Error: Invalid login credentials')
    if (res.status !== 200) throw Error('Error: Invalid server response')

    var objectRes = {}
    await res.text()
    .then(res => {
      var parameters = res.split("\n")
      parameters.map( param => {
        let values = param.split('=')
        objectRes[values[0]] = values[1]
      })
    })
    return objectRes
  }
}

export default GoogleAuth
