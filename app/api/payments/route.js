import { addPayment, fetchPayments } from "@/app/lib/data"

export async function GET(request) {
  const res = await fetchPayments()
  return Response.json(res)
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);
  jsonData.amount = parseInt(jsonData.amount)
  
  if (jsonData.traineeID) {
    jsonData.traineeID = parseInt(jsonData.traineeID)
  }

  try {
    const id = await addPayment(jsonData)
    return Response.json(id)
  } catch ({ name, message }) {
    return Response.json({ name, message },{status:400})
  }
}
