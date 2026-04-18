import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Tech Fix Hub';
    const category = searchParams.get('category') || 'Android Tips';

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: 'linear-gradient(135deg, #c25f3e 0%, #a04a2f 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Category badge */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 16px',
              borderRadius: 8,
              marginBottom: 32,
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            {category}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: 32,
              maxWidth: '90%',
            }}
          >
            {title.substring(0, 60)}
            {title.length > 60 ? '...' : ''}
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: 24,
              opacity: 0.8,
              marginTop: 32,
              borderTop: '2px solid rgba(255, 255, 255, 0.2)',
              paddingTop: 16,
              width: '100%',
              textAlign: 'center',
            }}
          >
            Tech Fix Hub
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('[v0] OG image error:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
