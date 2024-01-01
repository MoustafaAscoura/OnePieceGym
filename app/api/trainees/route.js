import { fetchTrainees } from "@/app/lib/data"

export async function GET(request) {
  const res = await fetchTrainees()
  return Response.json(res)
}