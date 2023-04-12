
function pageContextDefault() {
  const canonicalLink = document.querySelector("link[rel='canonical']")
  const canonicalHref = canonicalLink && canonicalLink.getAttribute('href')
  const searchParams = location.search
  
  // get URL string 
  const _canonicalUrl = () => {
    if (canonicalHref) {
      return canonicalHref.indexOf('?') > -1 ? canonicalHref : `${canonicalHref}${searchParams}`
    }
    const url = window.location.href
    const i = url.indexOf('#')
    return i === -1 ? url : url.slice(0, i)
  }
  
  // get path
  const _canonicalPath = () => {
    if (!canonicalHref) {
      return window.location.pathname
    }
    const a = document.createElement('a')
    a.href = canonicalHref
    const pathname = !a.pathname.startsWith('/') ? '/' + a.pathname : a.pathname
    return pathname
  }

  return {
    path: _canonicalPath(),
    referrer: document.referrer,
    search: searchParams,
    title: document.title,
    url: _canonicalUrl(),
  }
}
