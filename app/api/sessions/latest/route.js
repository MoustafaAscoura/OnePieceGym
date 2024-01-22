import { latestSessions } from "@/app/lib/data"

export async function GET(request) {
  const res = await latestSessions()
  return Response.json(res)
}
