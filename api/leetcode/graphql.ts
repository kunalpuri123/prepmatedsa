/* eslint-disable no-console */
// Vercel serverless function: proxy LeetCode GraphQL to avoid browser CORS issues in production.

import type { IncomingMessage, ServerResponse } from 'node:http';

const readBody = async (req: IncomingMessage): Promise<string> => {
  const chunks: Buffer[] = [];
  await new Promise<void>((resolve, reject) => {
    req.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on('end', () => resolve());
    req.on('error', (e) => reject(e));
  });
  return Buffer.concat(chunks).toString('utf8');
};

const setCors = (res: ServerResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

export default async function handler(req: IncomingMessage & { method?: string; body?: unknown }, res: ServerResponse) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const raw = (typeof req.body === 'string' && req.body) ? req.body : await readBody(req);
    const json = raw ? JSON.parse(raw) : req.body;

    const upstream = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // LeetCode occasionally blocks unknown clients; these headers help.
        'user-agent': 'Mozilla/5.0 (compatible; PrepMate/1.0)',
        origin: 'https://leetcode.com',
        referer: 'https://leetcode.com/',
        accept: 'application/json',
      },
      body: JSON.stringify(json ?? {}),
    });

    const text = await upstream.text();
    res.statusCode = upstream.status;
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
    // POTD changes daily; cache briefly at the edge/CDN.
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.end(text);
  } catch (e) {
    console.error('LeetCode GraphQL proxy failed', e);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Proxy error' }));
  }
}

