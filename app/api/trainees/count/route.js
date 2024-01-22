import { countTrainees } from "@/app/lib/data"

export async function GET(request) {
  const res = await countTrainees()
  return Response.json(res)
}