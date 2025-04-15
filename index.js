addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const targetSitemap = "https://mayouspublishing.blogspot.com/sitemap.xml"
  const response = await fetch(targetSitemap)

  if (!response.ok) {
    return new Response("Failed to fetch Blogger sitemap", { status: 502 })
  }

  let xml = await response.text()

  // Replace blogspot URLs with your domain and /blog prefix
  xml = xml.replace(
    /https:\/\/mayouspublishing\.blogspot\.com/g,
    "https://www.mayous.org/blog"
  )

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
    status: 200
  })
}
