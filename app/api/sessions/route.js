import { addSession, fetchSessions, deleteSession } from "@/app/lib/data"

export async function GET(request) {
  const res = await fetchSessions()
  return Response.json(res)
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);

  jsonData.traineeID = parseInt(jsonData.traineeID)
  jsonData.coachID = parseInt(jsonData.coachID)
  jsonData.rating =  parseFloat(jsonData.rating) || 5
  jsonData.duration = parseFloat(jsonData.duration) || 1
  jsonData.private = jsonData.private === "on"
  
  delete jsonData.hour

  const id = await addSession(jsonData)
  return Response.json(id)
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id")
  const res = deleteSession(parseInt(id))
  return Response.json(res)
}