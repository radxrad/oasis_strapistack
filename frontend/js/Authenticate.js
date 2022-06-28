'use strict';

import axios from "axios";
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

//import AsyncStorage from '@react-native-community/async-storage';
import AsyncLocalStorage from '@createnextapp/async-local-storage'
//const site = 'https://' + global.siteDomain;
const site = "https://discourse.earth2.ucsd.edu"

class Authenticate {
  client = axios

  constructor() {
    axios.defaults.withCredentials = true
    const jar = new CookieJar();
    this.client = wrapper(axios.create({ jar }));
  }
  setSession = (accessToken) => {
    if (typeof window !== 'undefined')
      localStorage.setItem('@Discourse.loginCookie', accessToken);
  };

  getAccessToken = () => {
    if (typeof window !== 'undefined')
      return localStorage.getItem('@Discourse.loginCookie');
  };

  login(username, password) {
    return new Promise((resolve, reject) => {
      // this.getAbout()
      //   .then((json) => {
      //     // old version
      //     if (json.about.version.startsWith('2.5')) {
      //       this.getCSRF()
      //         .then((json) => {
      //           if (json.csrf) {
      //             AsyncLocalStorage.getItem('@Discourse.loginCookie').then(
      //               (cookie) => {
      //                 this.twoFiveLogin(json.csrf, username, password, cookie)
      //                   .then((json) => {
      //                     if (json.error) {
      //                       reject(json);
      //                     } else {
      //                       resolve(json);
      //                     }
      //                   })
      //                   .catch((err) => {
      //                     console.log(err);
      //                     reject(err);
      //                   })
      //                   .done();
      //               },
      //             );
      //           }
      //         })
      //         .catch((err) => {
      //           reject(err);
      //         })
      //         .done();
      //     } else {
            this.getCSRF()
              .then((json) => {
                this.discourseAuth(json.csrf, username, password)
                  .then((json) => {
                    if (json.error) {
                      reject(json);
                    } else {
                      resolve(json);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    reject(err);
                  })
                  //.done();
              })
              .catch((err) => {
                console.log(err);
                reject(err);
              })
          //    .done();
    //      }
    //     })
    //     .done();
     });
  }

  getAbout() {
    return new Promise((resolve, reject) => {
      this.getCSRF().then ()
    //   let req = new Request(site + '/about.json', {
    // //    headers: null,
    //     method: 'GET',
    //   });
    //
    //   this._currentFetch = fetch(req);
      let req = {url:site + '/about.json',
      method: 'GET',
      }
      this._currentFetch  = this.client.request(req)
      this._currentFetch
        .then((r1) => {
          if (r1.status === 200) {
            return r1.json();
          } else {
            if (r1.status === 403) {
              throw '403 error';
            } else {
              throw 'Error during fetch status code:' + r1.status;
            }
          }
        })
        .then((result) => {
          resolve(result);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        })
        .finally(() => {
          this._currentFetch = undefined;
        })
        //.done();
    });

    // return new Promise((resolve, reject) => {
    //   let req = new Request(url, {
    //     method: 'GET',
    //   });

    //   this._currentFetch = fetch(req);
    //   this._currentFetch
    //     .then((versionInfo) => {
    //       if (versionInfo.status === 200) {
    //         console.log(versionInfo);
    //         return versionInfo.json();
    //       } else {
    //         throw 'Error during fetch status code:' + versionInfo.status;
    //       }
    //     })
    //     .then((result) => {
    //       resolve(result);
    //     })
    //     .catch((e) => {
    //       reject(e);
    //     })
    //     .finally(() => {
    //       this._currentFetch = undefined;
    //     })
    //     .done();
    // });
  }

  getCSRF() {
    let headers = {
      'X-CSRF-Token': 'undefined',
      Referer: site,
      'X-Requested-With': 'XMLHttpRequest',
    };

    let csrfUrl = `${site}/session/csrf`;

    return new Promise((resolve, reject) => {
      // let req = new Request(csrfUrl, {
      //   headers: headers,
      //   method: 'GET',
      //   //  credentials: "include",
      //   credentials: 'same-origin'
      // });
      //
      // this._currentFetch = fetch(req);
      let req = {url: csrfUrl,
      method:'GET',
      headers:headers,
        withCredentials: true,
        credentials: 'include'
      }
      this._currentFetch = this.client.request(req);
      this._currentFetch
        .then((r1) => {
          if (r1.status === 200) {
           // var cookie = r1.headers.map['set-cookie'];
            //var cookie = r1.headers['Set-Cookie'];
            var cookie = r1.config.jar.toJSON()
            AsyncLocalStorage.setItem(
              '@Discourse.loginCookie',
              JSON.stringify(cookie.cookies[0]),
            );
            return r1.json();
          } else {
            if (r1.status === 403) {
              throw '403 error';
            } else {
              throw 'Error during fetch status code:' + r1.status;
            }
          }
        })
        .then((result) => {
          resolve(result);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        })
        .finally(() => {
          this._currentFetch = undefined;
        })
       // .done();
    });
  }

  serializeParams(obj) {
    return Object.keys(obj)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent([obj[k]])}`)
      .join('&');
  }

  twoFiveLogin(csrf, username, password, cookie) {
    let headers = {
      'X-CSRF-Token': csrf,
      Origin: site,
      Referer: site,
      'X-Requested-With': 'XMLHttpRequest',
      Cookie: cookie,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    let data = {
      login: username,
      password: password,
    };

    return new Promise((resolve, reject) => {
      // let req = new Request(`${site}/session`, {
      //   headers: headers,
      //   method: 'POST',
      //   body: this.serializeParams(data),
      // });
      //
      // this._currentFetch = fetch(req);
      let req = {
        url: `${site}/session`,
          headers: headers,
          method: 'POST',
          body: this.serializeParams(data),
      }
      this._currentFetch = this.client.request(req);
      this._currentFetch
        .then((r1) => {
          if (r1.status === 200) {
            return r1.json();
          } else {
            if (r1.status === 403) {
              throw '403 error';
            } else {
              throw 'Error during fetch status code:' + r1.status;
            }
          }
        })
        .then((result) => {
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        })
        .finally(() => {
          this._currentFetch = undefined;
        })
        //.done();
    });
  }

  discourseAuth(csrf, username, password) {
    let headers = {
      Origin: site,
      Referer: site,
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    let data = {
      login: username,
      password: password,
      authenticity_token: csrf,
    };

    return new Promise((resolve, reject) => {
      // let req = new Request(`${site}/session`, {
      //   headers: headers,
      //   method: 'POST',
      //   body: this.serializeParams(data),
      // });
      let req = { url:`${site}/session`,
        headers: headers,
        method: 'POST',
        body: this.serializeParams(data),
      };
      //fetch(req)
      this.client.request(req)
        .then((r1) => {
          console.log(r1);
          if (r1.status === 200) {
            //var cookie = r1.headers.map['Set-Cookie'];
            var cookie = r1.config.jar.toJSON()
            AsyncStorage.setItem(
              '@Discourse.loginCookie',
              JSON.stringify(cookie.cookies[0]),
            );
            console.log(JSON.stringify(cookie.cookies[0]));
            return r1.json();
          } else {
            throw 'Error during fetch status code:' + r1.status;
          }
        })
        .then((result) => {
          resolve(result);
        })
        .catch((e) => {
          reject(e);
        })
        //.done();
    });
  }
}

export default Authenticate;
