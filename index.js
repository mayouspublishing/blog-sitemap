addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const targetSitemap = "https://blog.mayous.org/sitemap.xml"; // new source
  const response = await fetch(targetSitemap);

  if (!response.ok) {
    return new Response("Failed to fetch Blogger sitemap", { status: 502 });
  }

  let xml = await response.text();

  // Replace blog.mayous.org links with proxied mayous.org/blog URLs
  xml = xml.replace(
    /https:\/\/blog\.mayous\.org/g,
    "https://www.mayous.org/blog"
  );

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
    status: 200
  });
}
