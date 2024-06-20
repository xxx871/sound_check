"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import { useState } from "react"

function ContactForm() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch("/api/email", {
      method: "POST",
      
      body: JSON.stringify({ email, message }),
    })
  }

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div>
          <label className="text-white">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-white">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <Button type="submit" onClick={()=>router.push("/")}>Submit</Button>
      </form>
    </div>
  )
}

export default ContactForm
