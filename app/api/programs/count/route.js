import { countPrograms } from "@/app/lib/data"

export async function GET(request) {
  const res = await countPrograms()
  return Response.json(res)
}
