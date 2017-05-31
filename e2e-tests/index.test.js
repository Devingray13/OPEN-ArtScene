// <input type="text" class="inputtext _55r1 inputtext inputtext" name="email" id="email" tabindex="1" value="" autofocus="1”>
// <input type="password" class="inputtext _55r1 inputtext inputtext" name="pass" id="pass" tabindex="1">
// name:"f16128dfd46d8ac"

module.exports = {
  'working at all' : function (browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementVisible('body', 1000)
      .assert.visible('#loader-wrapper, #login-splash, #actual-site')
      .end();
  },
  'logged in' : function (browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementPresent('#login-button', 1000)
    //   .click('a#login-button')
    //   .moveTo('a#login-button')
    //   .mouseButtonClick(0)
      .execute(function(){
          $('#login-button').click()
      })
      .pause(1000)
      .windowHandles(function(result){
          let temp = result.value[1]
          this.switchWindow(temp)
      })
      .setValue('input[name=email]','open.artscene.denver@gmail.com')
      .setValue('input[name=pass]','frontpageofdenversartscene')
      .click('#loginbutton')
      .windowHandles(function(result){
          let temp = result.value[0]
          this.switchWindow(temp)
      })
      .pause(1000)
      .assert.visible('#actual-site')
      .assert.hidden('#login-splash')
      .end();
  },
  'content loaded' : function (browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementPresent('#login-button', 1000)
      .execute(function(){
          $('#login-button').click()
      })
      .pause(1000)
      .windowHandles(function(result){
          let temp = result.value[1]
          this.switchWindow(temp)
      })
      .setValue('input[name=email]','open.artscene.denver@gmail.com')
      .setValue('input[name=pass]','frontpageofdenversartscene')
      .click('#loginbutton')
       .pause(1000)
      .windowHandles(function(result){
          let temp = result.value[0]
          this.switchWindow(temp)
      })
      .assert.visible('#map')
      .assert.elementPresent('.individual-gallery')
      .assert.elementPresent('.individual-upcoming')
      .assert.visible('.daily-li')

      .end();
  },
  'responsive' : function (browser) {
    browser
      .url('http://localhost:8080/index.html')
      .waitForElementPresent('#login-button', 1000)
      .execute(function(){
          $('#login-button').click()
      })
      .pause(1000)
      .windowHandles(function(result){
          let temp = result.value[1]
          this.switchWindow(temp)
      })
      .setValue('input[name=email]','open.artscene.denver@gmail.com')
      .setValue('input[name=pass]','frontpageofdenversartscene')
      .click('#loginbutton')
       .pause(1000)
      .windowHandles(function(result){
          let temp = result.value[0]
          this.switchWindow(temp)
      })
      .assert.hidden('.hidden-nav')
      .resizeWindow(400,800)
      .assert.hidden('.main-nav-buttons')
      .assert.visible('.hidden-nav')
      .assert.hidden('.upcoming-list-time')

      .end();
  }
  // 'nav links work' : function (browser) {
  //   browser
  //     .url('http://localhost:8080/index.html')
  //     .waitForElementPresent('#login-button', 1000)
  //     .execute(function(){
  //         $('#login-button').click()
  //     })
  //     .pause(1000)
  //     .windowHandles(function(result){
  //         let temp = result.value[1]
  //         this.switchWindow(temp)
  //     })
  //     .setValue('input[name=email]','open.artscene.denver@gmail.com')
  //     .setValue('input[name=pass]','frontpageofdenversartscene')
  //     .click('#loginbutton')
  //      .pause(1000)
  //     .windowHandles(function(result){
  //         let temp = result.value[0]
  //         this.switchWindow(temp)
  //     })
  //     .click('.today')
  //     .elementIdLocationInView(function(result){
  //         console.log(result)
  //     })
  //     .end();
  // }
};
