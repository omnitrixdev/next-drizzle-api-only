import { NextRequest, NextResponse } from 'next/server'

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'editor',
  },
]

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ version: string }> },
) {
  const searchParams = req.nextUrl.searchParams
  const { version } = await params

  const query = searchParams.get('q')
  const res = {
    users,
    version,
    search: {
      query,
    },
  }

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
