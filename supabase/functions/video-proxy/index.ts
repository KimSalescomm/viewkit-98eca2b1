const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Proxying video URL:', url);

    // Fetch the video from LGE server
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'video/webm,video/mp4,video/*;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Referer': 'https://www.lge.co.kr/',
        'Origin': 'https://www.lge.co.kr',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch video:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Failed to fetch video: ${response.status} ${response.statusText}` 
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const contentType = response.headers.get('content-type') || 'video/mp4';
    const contentLength = response.headers.get('content-length');

    console.log('Video fetched successfully, content-type:', contentType, 'size:', contentLength);

    // Stream the video back
    const headers = new Headers(corsHeaders);
    headers.set('Content-Type', contentType);
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }
    headers.set('Cache-Control', 'public, max-age=86400');

    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error proxying video:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to proxy video';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
