import { createTestimonial, deleteTestimonial, fetchTestimonials } from "@/app/lib/data"


export async function GET(request) {
  const res = await fetchTestimonials()
  return Response.json(res)
}

export async function POST(request) {
  const formData = await request.formData()
  const jsonData = Object.fromEntries(formData);

  const id = await createTestimonial(jsonData)
  return Response.json(id)
}

export async function DELETE(request) {
  const data = await request.json()
  const id = await deleteTestimonial(data.id)
  return new Response(null, {status:204})
}
