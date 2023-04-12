const ogFetch = window.fetch;
window.fetch = (url, requestInit) => {
  if (url.includes("api.segment.io")) {
    console.log("segment http req", url);
    const body = JSON.parse(requestInit.body);
    console.log(
      body.name,
      "body.context.page -> ",
      body.context.page,
      "body.context.campaign ->",
      body.context.campaign,
      "body",
      body
    );
  }
  return ogFetch(url, requestInit);
};
