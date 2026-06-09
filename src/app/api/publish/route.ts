import { NextResponse } from 'next/server';
import { getContentFromKV, getStaticContent } from '@/lib/content';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST() {
  const GITHUB_TOKEN = process.env.GITHUB_PERSONAL_TOKEN;
  const GITHUB_OWNER = "mzidanrifqirtkj";
  const GITHUB_REPO  = "LP-pelaporan-tindak-kekerasan-seksual-di-perkuliahan";

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { success: false, error: "Token GitHub belum dikonfigurasi" },
      { status: 500 }
    );
  }

  try {
    const ctx = getCloudflareContext();
    const env = (ctx as any).env;

    const kvContent = await getContentFromKV(env);
    const content = kvContent || getStaticContent();

    const contentJson = JSON.stringify(content, null, 2);
    const encodedContent = Buffer.from(contentJson).toString('base64');

    const GH_HEADERS = {
      "Authorization": `Bearer ${GITHUB_TOKEN}`,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "ppkpt-admin/1.0",
    };

    const shaRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/src/data/content.json`,
      { headers: GH_HEADERS }
    );

    let sha: string | undefined;
    if (shaRes.ok) {
      const existing = await shaRes.json();
      sha = existing.sha;
    }

    const commitRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/src/data/content.json`,
      {
        method: "PUT",
        headers: { ...GH_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "chore: update content from admin panel",
          content: encodedContent,
          sha,
        }),
      }
    );

    if (!commitRes.ok) {
      const errText = await commitRes.text();
      return NextResponse.json({ success: false, error: `Gagal commit: ${errText}` }, { status: 400 });
    }

    const dispatchRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`,
      {
        method: "POST",
        headers: GH_HEADERS,
        body: JSON.stringify({
          event_type: "publish-event",
        }),
      }
    );

    if (dispatchRes.status === 204) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await dispatchRes.text();
      return NextResponse.json({ success: false, error: errorText }, { status: 400 });
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
