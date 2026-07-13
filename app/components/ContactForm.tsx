"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { submitContactForm } from "@/actions/contact"

const services = ["تصميم هوية بصرية", "تصميم شعار", "تصميمات سوشيال ميديا", "تصميم مطبوعات", "موشن جرافيك", "تصميم موقع", "خدمة أخرى"]
const formSchema = z.object({ name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين."), email: z.string().email("يرجى إدخال بريد إلكتروني صحيح."), phoneNumber: z.string().min(8, "يرجى إدخال رقم هاتف أو واتساب صحيح."), service: z.string().min(1, "اختر الخدمة المطلوبة."), message: z.string().min(10, "اكتب نبذة مختصرة عن مشروعك.") })
type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<{ success: boolean; message: string } | null>(null)
  const form = useForm<FormValues>({ resolver: zodResolver(formSchema), defaultValues: { name: "", email: "", phoneNumber: "", service: "", message: "" } })
  async function onSubmit(values: FormValues) {
    setIsSubmitting(true); setSubmissionStatus(null)
    try {
      const data = new FormData(); Object.entries(values).forEach(([k,v]) => data.append(k,v))
      const result = await submitContactForm(data)
      setSubmissionStatus({ success: result.success, message: result.message || (result.success ? "تم استلام طلبك بنجاح." : "حدث خطأ أثناء الإرسال.") })
      if (result.success) form.reset()
    } catch { setSubmissionStatus({ success: false, message: "تعذر إرسال الطلب. تواصل معنا عبر واتساب." }) }
    finally { setIsSubmitting(false) }
  }
  return (
    <section id="contact-form" className="bg-background py-20"><div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center"><p className="font-semibold text-primary">ابدأ مشروعك</p><h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">احكِ لنا عن مشروعك</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">أرسل التفاصيل الأساسية وسنتواصل معك لمناقشة النطاق المناسب والخطوة التالية.</p></motion.div><div className="grid gap-8 rounded-3xl border border-border bg-card/40 p-6 shadow-sm lg:grid-cols-[0.8fr_1.2fr] lg:p-10"><aside className="rounded-2xl bg-background/70 p-6"><h3 className="text-xl font-bold text-foreground">ماذا يحدث بعد الإرسال؟</h3><ol className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground"><li><strong className="text-foreground">1. نراجع الطلب:</strong> نفهم الخدمة والهدف والاحتياج الأساسي.</li><li><strong className="text-foreground">2. نتواصل معك:</strong> نستكمل التفاصيل ونقترح نطاق العمل الأنسب.</li><li><strong className="text-foreground">3. تستلم عرضًا واضحًا:</strong> يشمل المخرجات والمدة والتكلفة وشروط التنفيذ.</li></ol><a href="https://wa.me/201009215131?text=مرحبًا%20تاج%20ستوديو،%20أريد%20الاستفسار%20عن%20خدماتكم" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex font-semibold text-primary hover:underline">تفضل التواصل عبر واتساب؟</a></aside><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><FormField control={form.control} name="name" render={({ field }) => <FormItem><FormLabel>الاسم</FormLabel><FormControl><Input autoComplete="name" placeholder="الاسم الكامل" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="phoneNumber" render={({ field }) => <FormItem><FormLabel>الهاتف أو واتساب</FormLabel><FormControl><Input autoComplete="tel" inputMode="tel" placeholder="+966 أو +20" {...field} /></FormControl><FormMessage /></FormItem>} /></div><FormField control={form.control} name="email" render={({ field }) => <FormItem><FormLabel>البريد الإلكتروني</FormLabel><FormControl><Input type="email" autoComplete="email" placeholder="name@company.com" {...field} /></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="service" render={({ field }) => <FormItem><FormLabel>الخدمة المطلوبة</FormLabel><FormControl><select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><option value="">اختر الخدمة</option>{services.map((service) => <option key={service} value={service}>{service}</option>)}</select></FormControl><FormMessage /></FormItem>} /><FormField control={form.control} name="message" render={({ field }) => <FormItem><FormLabel>نبذة عن المشروع</FormLabel><FormControl><Textarea placeholder="ما طبيعة النشاط؟ وما الذي تريد تنفيذه؟" className="min-h-[140px]" {...field} /></FormControl><FormMessage /></FormItem>} /><Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "جاري إرسال الطلب..." : "إرسال طلب المشروع"}</Button><p className="text-center text-xs leading-6 text-muted-foreground">بإرسال النموذج، أنت توافق على <a href="/privacy-policy" className="underline hover:text-primary">سياسة الخصوصية</a>.</p>{submissionStatus && <div role="status" className={`rounded-xl p-4 text-center text-sm ${submissionStatus.success ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-red-500/10 text-red-700 dark:text-red-300"}`}>{submissionStatus.message}</div>}</form></Form></div></div></section>
  )
}
