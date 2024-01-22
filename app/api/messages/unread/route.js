import { unreadMessages } from "@/app/lib/data"

export async function GET(request) {
  const res = await unreadMessages()
  return Response.json(res)
}
