const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Allowed domains whitelist - only LGE domains are permitted
const ALLOWED_DOMAINS = ['lge.co.kr', 'lge.com', 'lgappstv.com'];

// Private IP patterns to block (SSRF protection)
const PRIVATE_IP_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,  // Link-local
  /^0\./,         // Invalid
  /^\[::1\]/,     // IPv6 localhost
  /^\[fc/i,       // IPv6 private
  /^\[fd/i,       // IPv6 private
  /^\[fe80:/i,    // IPv6 link-local
];

function isPrivateIP(hostname: string): boolean {
  return PRIVATE_IP_PATTERNS.some(pattern => pattern.test(hostname));
}

function isAllowedDomain(hostname: string): boolean {
  return ALLOWED_DOMAINS.some(domain => 
    hostname === domain || hostname.endsWith(`.${domain}`)
  );
}

function validateUrl(urlString: string): { valid: boolean; error?: string; url?: URL } {
  let urlObj: URL;
  
  try {
    urlObj = new URL(urlString);
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }

  // Only allow http and https protocols
  if (urlObj.protocol !== 'https:' && urlObj.protocol !== 'http:') {
    return { valid: false, error: 'Only HTTP and HTTPS protocols are allowed' };
  }

  const hostname = urlObj.hostname.toLowerCase();

  // Block private IPs and localhost (SSRF protection)
  if (isPrivateIP(hostname)) {
    return { valid: false, error: 'Private or internal addresses are not allowed' };
  }

  // Only allow whitelisted domains
  if (!isAllowedDomain(hostname)) {
    return { valid: false, error: 'Domain not in allowed list' };
  }

  return { valid: true, url: urlObj };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required and must be a string' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL before proxying
    const validation = validateUrl(url);
    if (!validation.valid) {
      console.warn('URL validation failed:', url, validation.error);
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
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
