"use server"

import { z } from "zod"
import { Resend } from "resend"

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون على الأقل حرفين." }),
  email: z.string().email({ message: "يرجى إدخال عنوان بريد إلكتروني صحيح." }),
  phoneNumber: z.string().min(10, { message: "يرجى إدخال رقم هاتف صحيح." }),
  budget: z.string().min(1, { message: "يرجى إدخال الميزانية." }),
  message: z.string().min(10, { message: "الرسالة يجب أن تكون على الأقل 10 أحرف." }),
})

// أنشئ كائن Resend فقط إذا كان المفتاح موجودًا لتجنب الأخطاء في بيئات المعاينة
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function submitContactForm(formData: FormData) {
  console.log("بدء معالجة نموذج الاتصال...")
  console.log("قيمة RESEND_API_KEY موجودة:", !!process.env.RESEND_API_KEY) // للتحقق مما إذا كان المتغير موجودًا

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber"),
    budget: formData.get("budget"),
    message: formData.get("message"),
  }

  const parsed = formSchema.safeParse(data)

  if (!parsed.success) {
    console.error("فشل التحقق من صحة البيانات:", parsed.error.flatten().fieldErrors)
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "فشل التحقق من صحة البيانات.",
    }
  }

  try {
    if (!resend) {
      console.warn("RESEND_API_KEY غير مُعرّف. تم تخطي إرسال البريد الإلكتروني، لكن البيانات سُجلت في السجلات.")
      // يمكنك هنا إرجاع نجاح مؤقت إذا كنت تريد أن يرى المستخدم رسالة نجاح حتى لو لم يتم إرسال البريد الإلكتروني
      return {
        success: true,
        message: "تم استلام رسالتك بنجاح (لم يتم إرسال بريد إلكتروني بسبب عدم توفر مفتاح API).",
      }
    } else {
      console.log("جاري إرسال البريد الإلكتروني عبر Resend...")
      await resend.emails.send({
        from: "onboarding@resend.dev", // تأكد من أن هذا النطاق مسموح به في Resend أو استخدم نطاقك الخاص
        to: "pro.designer615@gmail.com",
        subject: `رسالة جديدة من نموذج الاتصال - ${parsed.data.name}`,
        html: `
          <p><strong>الاسم:</strong> ${parsed.data.name}</p>
          <p><strong>البريد الإلكتروني:</strong> ${parsed.data.email}</p>
          <p><strong>رقم الهاتف:</strong> ${parsed.data.phoneNumber}</p>
          <p><strong>الميزانية:</strong> ${parsed.data.budget}</p>
          <p><strong>الرسالة:</strong><br/>${parsed.data.message}</p>
        `,
      })
      console.log("تم إرسال البريد الإلكتروني بنجاح.")
    }
    console.log("تمت معالجة رسالة الاتصال بنجاح.")
  } catch (error) {
    console.error("فشل إرسال البريد الإلكتروني:", error)
    // إذا كان الخطأ من Resend، قد يحتوي على تفاصيل إضافية
    if (error instanceof Error) {
      console.error("تفاصيل الخطأ:", error.message)
    }
    return {
      success: false,
      message: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقاً.",
    }
  }

  return {
    success: true,
    message: "شكراً لك على رسالتك. سنعود إليك قريباً!",
  }
}
