const addClickHandler = (id, fn) => {
  const r = document.getElementById(id);
  if (!r) {
    console.warn(`${id} ID not found in DOM.`);
    return;
  }
  r.addEventListener("click", fn);
};

class MyApp {
  static pageProperties = {
    url: document.location.href,
    path: document.location.pathname,
  };

  constructor() {
    addClickHandler("track", this.onTrackClick);
    addClickHandler("login", this.onLoginClick);
    addClickHandler("page", this.onPageClick);
    addClickHandler("qp", this.onQPUpdateClick);

    const createLogger = (str) => () => console.log(`${str} called.`);

    window.analytics
      .on("track", createLogger("track"))
      .on("identify", createLogger("identify"))
      .on("page", createLogger("page"));

    window.analytics.ready(() => {
      const writeKey = document.getElementById("key");
      console.log(`Loaded -> ${window.analytics.VERSION}`);
      writeKey.innerHTML = "LOADED";
    });
  }

  onLoginClick() {
    window.analytics.identify("MY_USER_ID", {
      logins: "5",
    });
  }

  onTrackClick() {
    window.analytics.track("Thing Completed", {
      title: "How to Create a Tracking Plan",
      course: "Intro to Analytics",
    });
  }

  onPageClick() {
    window.analytics.page()
  }

  onQPUpdateClick() {
    const url = new URL(window.location.href);
    const id = Math.round(Math.random() * 10000);
    console.log(id);
    url.searchParams.set("id", id);
    url.searchParams.set("utm_source", `source-${id}`);
    url.searchParams.set("utm_campaign", `campaign-${id}`);
    window.history.replaceState(null, "", url);
  }
}

window.app = new MyApp();
