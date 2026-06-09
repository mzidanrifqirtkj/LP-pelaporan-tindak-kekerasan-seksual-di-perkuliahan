import { NextResponse } from 'next/server';
import { getContent, getStaticContent, getContentFromKV, saveContentToKV } from '@/lib/content';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ctx = getCloudflareContext();
    const env = (ctx as any).env;
    const kvContent = await getContentFromKV(env);

    if (kvContent) {
      return NextResponse.json(kvContent);
    }

    const staticContent = await getContent();
    return NextResponse.json(staticContent);
  } catch {
    const staticContent = await getContent();
    return NextResponse.json(staticContent);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const ctx = getCloudflareContext();
    const env = (ctx as any).env;
    await saveContentToKV(env, body);

    return NextResponse.json({ success: true, path: 'KV:ppkpt:content' });
  } catch {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
