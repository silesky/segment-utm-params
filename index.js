

console.log("Stale reference check!");
analytics.identify("foo", "bar")


const ajs = window.analytics;

class MyApp {
  constructor() {
    window.analytics.ready(() => {
      // wire up track event
      const btn = document.getElementById("btn");
      btn.addEventListener("click", this.onTrackClick);

      // wire up login event
      const login = document.getElementById("login");
      login.addEventListener("click", this.onLoginClick);

      // show key
      const writeKey = document.getElementById("key");
      writeKey.innerHTML = window.analyticsWriteKey || "LOADED";

      console.log(`Loaded -> ${ajs.VERSION}`);
    });
  }

  onLoginClick() {
    console.log('login click', ajs);
    ajs
      .identify("MY_USER_ID", {
        logins: "5",
      })
      .then(console.log);
  }

  onTrackClick() {
    console.log('track click', ajs);
    ajs
      .track("Thing Completed", {
        title: "How to Create a Tracking Plan",
        course: "Intro to Analytics",
      })
      .then(console.log);
  }
}

window.app = new MyApp();
