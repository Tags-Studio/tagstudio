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
import { submitContactForm } from "@/actions/contact" // استيراد الـ Server Action الجديد

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون على الأقل حرفين." }),
  email: z.string().email({ message: "يرجى إدخال عنوان بريد إلكتروني صحيح." }),
  phoneNumber: z.string().min(10, { message: "يرجى إدخال رقم هاتف صحيح." }),
  budget: z.string().min(1, { message: "يرجى إدخال الميزانية." }),
  message: z.string().min(10, { message: "الرسالة يجب أن تكون على الأقل 10 أحرف." }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<{ success: boolean; message: string } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      budget: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmissionStatus(null)

    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("email", values.email)
    formData.append("phoneNumber", values.phoneNumber)
    formData.append("budget", values.budget)
    formData.append("message", values.message)

    const result = await submitContactForm(formData)

    if (result.success) {
      setSubmissionStatus({ success: true, message: result.message })
      form.reset()
    } else {
      setSubmissionStatus({ success: false, message: result.message || "حدث خطأ أثناء الإرسال." })
      // يمكنك هنا معالجة الأخطاء بشكل أكثر تفصيلاً إذا كانت موجودة في result.errors
    }
    setIsSubmitting(false)
  }

  return (
    <section id="contact-form" className="bg-background py-20">
      {" "}
      {/* إضافة ID هنا */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">تواصل معنا</h2>
          <p className="text-lg text-muted-foreground">
            نحب أن نسمع منك. املأ النموذج أدناه وسنعود إليك في أقرب وقت ممكن.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم</FormLabel>
                    <FormControl>
                      <Input placeholder="أحمد محمد" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input placeholder="ahmed@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input placeholder="+966 50 000 0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الميزانية</FormLabel>
                    <FormControl>
                      <Input placeholder="1,000 - 5,000 ريال" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرسالة</FormLabel>
                    <FormControl>
                      <Textarea placeholder="أخبرنا عن مشروعك..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
              </Button>
              {submissionStatus && (
                <div className={`mt-4 text-center ${submissionStatus.success ? "text-green-600" : "text-red-600"}`}>
                  {submissionStatus.message}
                </div>
              )}
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
