/* eslint-disable no-console */
// Vercel serverless function: proxy LeetCode problems list to avoid browser CORS issues in production.

import type { IncomingMessage, ServerResponse } from 'node:http';

const setCors = (res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

export default async function handler(req: IncomingMessage & { method?: string }, res: ServerResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const upstream = await fetch('https://leetcode.com/api/problems/all/', {
      method: 'GET',
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; PrepMate/1.0)',
        accept: 'application/json',
        referer: 'https://leetcode.com/',
      },
    });

    const text = await upstream.text();
    res.statusCode = upstream.status;
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    // This list changes rarely; cache longer.
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
    res.end(text);
  } catch (e) {
    console.error('LeetCode problems proxy failed', e);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Proxy error' }));
  }
}

