import Parser from "rss-parser";

export async function GET(req) {
  const RSS_URL = `https://feeds.libsyn.com/169844/`;
  const parser = new Parser();
  try {
    const feed = await parser.parseURL(RSS_URL);
    return new Response(JSON.stringify(feed.items), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch RSS feed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
      },
    });
  }
}
