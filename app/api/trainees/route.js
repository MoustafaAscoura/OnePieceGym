import { fetchTrainees, editTrainee, createTrainee, deleteTrainee } from "@/app/lib/data"

export async function GET(request) {
  const res = await fetchTrainees()
  return Response.json(res)
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);

  if (jsonData.coachID) jsonData.coachID = parseInt(jsonData.coachID)
  if (jsonData.programID) jsonData.programID = parseInt(jsonData.programID)
  if (jsonData.specialID) jsonData.specialID = parseInt(jsonData.specialID)
  if (jsonData.privateID) jsonData.privateID = parseInt(jsonData.privateID)
  if (jsonData.id) jsonData.id = parseInt(jsonData.id)
  if (jsonData.birthdate) jsonData.birthdate = new Date(jsonData.birthdate)

  const id = jsonData.id ? await editTrainee(jsonData) : await createTrainee(jsonData)
  return Response.json(id)
}

export async function DELETE(request) {
  const data = await request.json()

  const id = await deleteTrainee(data.id)
  return new Response(null, {status:204})
}
