import { fetchTrainees, editTrainee, createTrainee, deleteTrainee } from "@/app/lib/data"

export async function GET(request) {
  const res = await fetchTrainees()
  return Response.json(res)
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);

  if (jsonData.coachID == "0"){
    delete jsonData['coachID']
  } else {
    jsonData.coachID = parseInt(jsonData.coachID)
  }

  if (jsonData.programID == "0"){
    delete jsonData['programID']
  } else {
    jsonData.programID = parseInt(jsonData.programID)
  }

  if (jsonData.id){
    jsonData.id = parseInt(jsonData.id)
  }
  
  jsonData.birthdate = new Date(jsonData.birthdate)

  try {
    const id = jsonData.id ? await editTrainee(jsonData) : await createTrainee(jsonData)
    return Response.json(id)
  } catch ({ name, message }) {
    return Response.json({ name, message },{status:400})
  }
}

export async function DELETE(request) {
  const data = await request.json()
  try {
    const id = await deleteTrainee(data.id)
    return new Response(null, {status:204})
  } catch ({ name, message }) {
    return Response.json({ name, message },{status:400})
  }
}