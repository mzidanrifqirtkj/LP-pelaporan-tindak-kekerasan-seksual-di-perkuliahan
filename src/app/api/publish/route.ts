import { NextResponse } from 'next/server';

export async function POST() {
  const GITHUB_TOKEN = process.env.GITHUB_PERSONAL_TOKEN; 
  const GITHUB_OWNER = "mzidanrifqirtkj"; // Ganti dengan username GitHub kamu
  const GITHUB_REPO  = "LP-pelaporan-tindak-kekerasan-seksual-di-perkuliahan"; // Ganti dengan nama repo kamu

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { success: false, error: "Token GitHub belum dikonfigurasi di .env" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          event_type: "publish-event", // Harus sama dengan isi deploy.yml
        }),
      }
    );

    if (response.status === 204) {
      return NextResponse.json({ success: true });
    } else {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: errorText }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}