import { editSettings, fetchSettings } from "@/app/lib/data"

export async function GET(request) {
  const res = await fetchSettings()
  return Response.json(res)
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);
  const id = await editSettings(jsonData)
  return Response.json(id)
}
