"use server"

import { z } from "zod"
import { Resend } from "resend"

const formSchema = z.object({ name: z.string().min(2), email: z.string().email(), phoneNumber: z.string().min(8), service: z.string().min(1), message: z.string().min(10) })
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
function escapeHtml(value: string) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;") }

export async function submitContactForm(formData: FormData) {
  const data = { name: formData.get("name"), email: formData.get("email"), phoneNumber: formData.get("phoneNumber"), service: formData.get("service"), message: formData.get("message") }
  const parsed = formSchema.safeParse(data)
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors, message: "راجع البيانات المطلوبة وحاول مرة أخرى." }
  if (!resend) return { success: false, message: "خدمة البريد غير مفعلة حاليًا. تواصل معنا مباشرة عبر واتساب." }
  const safe = { name: escapeHtml(parsed.data.name), email: escapeHtml(parsed.data.email), phoneNumber: escapeHtml(parsed.data.phoneNumber), service: escapeHtml(parsed.data.service), message: escapeHtml(parsed.data.message).replaceAll("\n", "<br />") }
  try {
    const result = await resend.emails.send({ from: process.env.CONTACT_FROM_EMAIL || "Tag Studio Website <onboarding@resend.dev>", to: process.env.CONTACT_TO_EMAIL || "pro.designer615@gmail.com", replyTo: parsed.data.email, subject: `طلب مشروع جديد: ${parsed.data.service} — ${parsed.data.name}`, html: `<div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.8"><h2>طلب مشروع جديد من موقع تاج ستوديو</h2><p><strong>الاسم:</strong> ${safe.name}</p><p><strong>البريد:</strong> ${safe.email}</p><p><strong>الهاتف:</strong> ${safe.phoneNumber}</p><p><strong>الخدمة:</strong> ${safe.service}</p><p><strong>تفاصيل المشروع:</strong><br />${safe.message}</p></div>` })
    if (result.error) throw new Error(result.error.message)
    return { success: true, message: "تم استلام طلبك بنجاح، وسنتواصل معك لاستكمال التفاصيل." }
  } catch (error) { console.error("Contact form email failed:", error); return { success: false, message: "تعذر إرسال الطلب حاليًا. تواصل معنا مباشرة عبر واتساب." } }
}
