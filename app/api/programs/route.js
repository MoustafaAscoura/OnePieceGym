import { fetchPrograms, createProgram, deleteProgram, editProgram } from "@/app/lib/data"

export async function GET(request) {
  const res = await fetchPrograms()
  return Response.json(res)
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);

  if (jsonData.id){
    jsonData.id = parseInt(jsonData.id)
  }
  jsonData.cost = parseInt(jsonData.cost)
  jsonData.basic = jsonData.basic == "true"
  jsonData.show = jsonData.show == "true"
  jsonData.duration = parseInt(jsonData.duration)
  jsonData.features = jsonData.features.split("\r\n")

  try {
    const id = jsonData.id ? await editProgram(jsonData) : await createProgram(jsonData)

    return Response.json(id)
  } catch ({ name, message }) {
    return Response.json({ name, message },{status:400})
  }
}

export async function DELETE(request) {
  const data = await request.json()
  try {
    const id = await deleteProgram(data.id)
    return new Response(null, {status:204})
  } catch ({ name, message }) {
    return Response.json({ name, message },{status:400})
  }
}
