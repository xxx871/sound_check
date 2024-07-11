"use client"

import { LoadingButton } from "@/app/components/elements/LoadingButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import { useState } from "react"

function ContactForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await fetch("/api/email", {
        method: "POST",
        body: JSON.stringify({ email, message }),
      });
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <LoadingButton
          type="submit"
          variant="outline"
          className="w-32 h-12 text-lg text-white"
          isLoading={isLoading}
        >
          送信
        </LoadingButton>
      </form>
    </div>
  )
}

export default ContactForm
