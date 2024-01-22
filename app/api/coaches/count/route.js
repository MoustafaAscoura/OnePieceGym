import { countCoaches } from "@/app/lib/data"

export async function GET(request) {
  const res = await countCoaches()
  return Response.json(res)
}