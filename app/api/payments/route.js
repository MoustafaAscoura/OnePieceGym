import { addPayment, fetchPayments, deletePayment } from "@/app/lib/data"

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

  const id = await addPayment(jsonData)
  return Response.json(id)
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id")
  const res = deletePayment(parseInt(id))
  return Response.json(res)
}
