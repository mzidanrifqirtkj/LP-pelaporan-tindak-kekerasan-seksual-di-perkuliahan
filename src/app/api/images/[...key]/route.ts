import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  try {
    const { key } = await params;
    const objectKey = key.join('/');

    const ctx = getCloudflareContext();
    const env = ctx.env as { PPKPT_IMAGES: R2Bucket };

    const object = await env.PPKPT_IMAGES.get(objectKey);

    if (!object) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 404 });
    }

    const headers = new Headers();
    if (object.httpMetadata?.contentType) {
      headers.set('Content-Type', object.httpMetadata.contentType);
    }
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    if (object.etag) {
      headers.set('ETag', object.etag);
    }

    return new NextResponse(object.body, { headers });
  } catch {
    return NextResponse.json({ error: 'Gagal mengambil file' }, { status: 500 });
  }
}
