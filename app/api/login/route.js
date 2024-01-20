import { getCoach, getTrainee } from "@/app/lib/data"


export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);

  let user
  if (jsonData.coach == "true") {
    user = await getCoach(jsonData.id)
  } else {
    user = await getTrainee(jsonData.id)
  }

  return Response.json(user)
}