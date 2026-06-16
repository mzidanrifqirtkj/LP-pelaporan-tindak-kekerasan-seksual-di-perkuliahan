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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (ctx as any).env;

    const object = await env.PPKPT_IMAGES.get(objectKey);

    if (!object) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 404 });
    }

    const headers = new Headers();
    if (object.httpMetadata?.contentType) {
      headers.set('Content-Type', object.httpMetadata.contentType);
    }
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('ETag', object.etag);

    const body = await object.arrayBuffer();
    return new NextResponse(body, { headers });
  } catch {
    return NextResponse.json({ error: 'Gagal mengambil file' }, { status: 500 });
  }
}
