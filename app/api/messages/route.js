import { fetchMessages, seeMessage, createMessage } from "@/app/lib/data"

export async function GET(request) {
  const res = await fetchMessages()
  return Response.json(res)
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);
  try {
    const id = await createMessage(jsonData)
    return Response.json(id)
  } catch ({ name, message }) {
    return Response.json({ name, message },{status:400})
  }
}


export async function PATCH(request) {
  const id = request.nextUrl.searchParams.get("id")
  const res = seeMessage(parseInt(id))
  return Response.json(res)
}