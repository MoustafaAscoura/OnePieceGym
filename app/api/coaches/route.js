import { fetchCoaches, editCoach, deleteCoach, createCoach } from "@/app/lib/data"

export async function GET(request) {
  try {
      const res = await fetchCoaches()
  return Response.json(res)
  } catch ({ name, message }) {
    return Response.json({ name, message },{status:400})
  }
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);

  if (jsonData.id){
    jsonData.id = parseInt(jsonData.id)
  }
  
  jsonData.birthdate = new Date(jsonData.birthdate)

  try {
    const id = jsonData.id ? await editCoach(jsonData) : await createCoach(jsonData)
    return Response.json(id)
  } catch ({ name, message }) {
    return Response.json({ name, message },{status:400})
  }
}

export async function DELETE(request) {
  const data = await request.json()
  try {
    const id = await deleteCoach(data.id)
    return new Response(null, {status:204})
  } catch ({ name, message }) {
    return Response.json({ name, message },{status:400})
  }
}
