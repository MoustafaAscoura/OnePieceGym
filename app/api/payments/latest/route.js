import { latestPayments } from "@/app/lib/data"

export async function GET(request) {
  const res = await latestPayments()
  return Response.json(res)
}
