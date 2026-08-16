import { NextResponse } from 'next/server';

export async function GET() {
  const projects = [
    { id: 1, title: 'Devmark', category: 'Sistemas Web' },
    { id: 2, title: 'Vision360', category: 'Webs' },
    { id: 3, title: 'Inoia AI', category: 'IA' },
  ];

  return NextResponse.json({ projects, total: projects.length });
}
