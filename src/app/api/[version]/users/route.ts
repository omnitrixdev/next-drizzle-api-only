import { drizzle } from 'drizzle-orm/libsql'
import { usersTable } from '~/db/schema'

const db = drizzle(process.env.DB_FILE_NAME!)

export async function GET() {
  const users = await db.select().from(usersTable)
  console.log('users', users)
  const res = {
    users,
    count: users.length,
  }

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function POST(req: Request) {
  const body = await req.json()
  try {
    const result = await db.insert(usersTable).values(body).returning()

    if (!result || result.length === 0) {
      return new Response('User not created!', {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const res = {
      message: 'User created!',
      result,
    }

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.log('fucking error', error)
  }
}
