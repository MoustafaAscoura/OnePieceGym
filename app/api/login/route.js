import { getCoach, getTrainee } from "@/app/lib/data"


export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);
  jsonData.id = parseInt(jsonData.id)
  let data
  try {
    data = await getCoach(jsonData)
    data.coach = true
  } catch {
    data = await getTrainee(jsonData)
    data.coach = false
  }

  return Response.json(data)
}