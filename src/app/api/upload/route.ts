import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = formData.get('folder') as string | null;

    if (!file || !folder) {
      return NextResponse.json(
        { error: 'File dan folder harus diisi' },
        { status: 400 }
      );
    }

    if (file.size > 1 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file maksimal 1 MB' },
        { status: 400 }
      );
    }

    const allowedFolders = ['hero', 'quicklinks', 'lapor', 'team', 'dokumen', 'umum'];
    if (!allowedFolders.includes(folder)) {
      return NextResponse.json(
        { error: `Folder tidak valid. Pilihan: ${allowedFolders.join(', ')}` },
        { status: 400 }
      );
    }

    const ext = file.name.split('.').pop() || 'bin';
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);
    const timestamp = Date.now();
    const key = `${folder}/${timestamp}-${cleanName}.${ext}`;

    const ctx = getCloudflareContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (ctx as any).env;

    const bytes = new Uint8Array(await file.arrayBuffer());
    await env.PPKPT_IMAGES.put(key, bytes, {
      httpMetadata: { contentType: file.type },
    });

    const publicUrlBase = process.env.R2_PUBLIC_URL || '';
    const url = publicUrlBase ? `${publicUrlBase}/${key}` : `/api/images/${key}`;

    return NextResponse.json({
      success: true,
      key,
      url,
      fileName: file.name,
      folder,
    });
  } catch (error: unknown) {
    console.error('Upload error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Gagal mengupload file' },
      { status: 500 }
    );
  }
}
