"use client"

import * as React from "react"
import { Toaster, toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, AlertTriangle } from 'lucide-react'

interface FormState {
  name: string
  email: string
  company: string
  message: string
  honeypot: string
}

interface FieldErrors {
  name?: string[]
  email?: string[]
  company?: string[]
  message?: string[]
}

export function ContactForm() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: "",
    honeypot: "",
  })
  const [isPending, setIsPending] = React.useState(false)
  const [errors, setErrors] = React.useState<FieldErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    setErrors({})

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Message Sent!", {
          description: "Thank you for your message. We'll be in touch soon!",
          icon: <CheckCircle className="h-4 w-4" />,
        })
        setForm({ name: "", email: "", company: "", message: "", honeypot: "" })
      } else {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors)
        }
        toast.error("Submission Failed", {
          description: data.error || "Please correct the errors and try again.",
          icon: <AlertTriangle className="h-4 w-4" />,
        })
      }
    } catch (error) {
      toast.error("An Error Occurred", {
        description: "Could not send message. Please try again later.",
        icon: <AlertTriangle className="h-4 w-4" />,
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
          </div>
          <div>
            <Input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
          </div>
        </div>
        <div>
          <Input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
          {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company[0]}</p>}
        </div>
        <div>
          <Textarea name="message" placeholder="Your Message" rows={5} value={form.message} onChange={handleChange} required />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>}
        </div>
        {/* Honeypot field for spam prevention */}
        <input
          type="text"
          name="honeypot"
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          value={form.honeypot}
          onChange={handleChange}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-b from-primary via-primary to-orange-600 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/40"
          disabled={isPending}
        >
          <Mail className="mr-2 h-5 w-5" />
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </>
  )
}