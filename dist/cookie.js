const Cookie = new Proxy(
  function(){
    let cookies = {};
    if(document.cookie){
      let c = document.cookie.split(";");
      c.forEach(cookie => {
        cookie = cookie.split("=");
        cookies[cookie[0].trim()] = cookie[1].trim();
      });
    }
    console.log(cookies);
    return cookies
  }(),
  {
    get(target, name, receiver) {
      if (Reflect.has(target, name)) {
        return Reflect.get(target, name, receiver)
      }
      return ""
    },
    
    set(target, name, val){
      document.cookie = `${name}=${val}`;
      return Reflect.set(...arguments)
    }
  });

window.Cookie = Cookie;
