import { fetchCoaches, editCoach, deleteCoach, createCoach } from "@/app/lib/data"

export async function GET(request) {
  const res = await fetchCoaches()
  return Response.json(res)
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);

  if (jsonData.id){
    jsonData.id = parseInt(jsonData.id)
  }
  
  jsonData.birthdate = new Date(jsonData.birthdate)
  const id = jsonData.id ? await editCoach(jsonData) : await createCoach(jsonData)
  return Response.json(id)
}

export async function DELETE(request) {
  const data = await request.json()
  const id = await deleteCoach(data.id)
  return new Response(null, {status:204})
}
