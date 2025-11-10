import { NextRequest, NextResponse } from 'next/server';

/**
 * Like API Route
 * 
 * GET  /api/likes/[slug] - Get like count and user's like status
 * POST /api/likes/[slug] - Toggle like for a post
 * 
 * Storage: In-memory (for demo). Replace with KV store (Vercel KV, Redis, etc.) in production.
 */

// In-memory storage (replace with KV store in production)
const likeStore = new Map<string, number>();
const userLikes = new Map<string, Set<string>>();

// Get client identifier (IP address + User-Agent hash)
function getClientId(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${ip}:${userAgent.substring(0, 50)}`;
}

// GET - Fetch like count and user's like status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const clientId = getClientId(request);
    
    const count = likeStore.get(slug) || 0;
    const userLikeSet = userLikes.get(slug) || new Set();
    const liked = userLikeSet.has(clientId);

    return NextResponse.json({ count, liked }, { status: 200 });
  } catch (error) {
    console.error('GET /api/likes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch like data' },
      { status: 500 }
    );
  }
}

// POST - Toggle like
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const clientId = getClientId(request);
    const body = await request.json();
    const { liked } = body;

    // Get or create like set for this post
    let userLikeSet = userLikes.get(slug);
    if (!userLikeSet) {
      userLikeSet = new Set();
      userLikes.set(slug, userLikeSet);
    }

    // Get current count
    let count = likeStore.get(slug) || 0;

    // Toggle like
    if (liked) {
      if (!userLikeSet.has(clientId)) {
        userLikeSet.add(clientId);
        count += 1;
      }
    } else {
      if (userLikeSet.has(clientId)) {
        userLikeSet.delete(clientId);
        count = Math.max(0, count - 1);
      }
    }

    // Update count
    likeStore.set(slug, count);

    return NextResponse.json({ count, liked }, { status: 200 });
  } catch (error) {
    console.error('POST /api/likes error:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500 }
    );
  }
}
