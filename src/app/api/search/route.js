import { NextResponse } from "next/server";

let cachedWords = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // Cache duration in milliseconds (5 minutes)

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  try {
    const currentTime = Date.now();
    if (!cachedWords || currentTime - lastFetchTime > CACHE_DURATION) {
      // Fetch all words from the external API
      const response = await fetch("https://random-word-api.herokuapp.com/all");
      if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch words" }, { status: 500 });
      }

      cachedWords = await response.json();
      lastFetchTime = currentTime;
    }

    const filteredWords = cachedWords.filter((word) =>
      word.toLowerCase().startsWith(query)
    );

    return NextResponse.json({ suggestions: filteredWords });
  } catch (error) {
    console.error("Error fetching or filtering words:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
