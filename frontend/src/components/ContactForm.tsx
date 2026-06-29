"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/FormField";
import { Icon } from "@/components/ui/Icon";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  studentClass: string;
  subject: string;
  message: string;
}

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  studentClass: "",
  subject: "",
  message: "",
};

const classOptions = [
  "Class 8-10",
  "Higher Secondary (PCM/B)",
  "Commerce",
  "Test Prep / IELTS",
  "Other",
];

/**
 * Inquiry form. Currently validates and simulates submission on the client;
 * Phase 7 wires `onSubmit` to POST /api/inquiries on the FastAPI backend.
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1";
    try {
      const res = await fetch(`${apiBase}/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          student_class: form.studentClass,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          typeof data?.detail === "string"
            ? data.detail
            : "Something went wrong. Please try again.",
        );
      }
      setSubmitted(true);
      setForm(initialState);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit. Please try again later.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-surface-container-high bg-white p-12 text-center ambient-shadow">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container">
          <Icon name="check_circle" className="text-4xl text-primary" />
        </div>
        <h3 className="mb-2 text-headline-md font-semibold text-on-surface">
          Inquiry Received!
        </h3>
        <p className="mb-6 text-body-md text-on-surface-variant">
          Thank you for reaching out. Our academic advisors will get back to you
          within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="font-bold text-primary hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-surface-container-high bg-white p-8 ambient-shadow lg:p-10">
      <h3 className="mb-1 text-headline-md font-semibold text-on-surface">
        Send an Inquiry
      </h3>
      <p className="mb-8 text-body-md text-on-surface-variant">
        Fill out the form below and our team will get back to you within 24 hours.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-error-container px-4 py-3 text-label-md font-medium text-on-error-container">
            <Icon name="error" className="text-xl" />
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={update("fullName")}
            required
          />
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="example@domain.com"
            value={form.email}
            onChange={update("email")}
            required
          />
          <Input
            id="phone"
            type="tel"
            label="Phone Number"
            placeholder="+44 000 000 000"
            value={form.phone}
            onChange={update("phone")}
            required
          />
          <Select
            id="studentClass"
            label="Student Class/Year"
            value={form.studentClass}
            onChange={update("studentClass")}
            required
          >
            <option value="" disabled>
              Select current year
            </option>
            {classOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </div>
        <Input
          id="subject"
          label="Subject of Interest"
          placeholder="e.g. Advanced Mathematics, Physics, English Literature"
          value={form.subject}
          onChange={update("subject")}
        />
        <Textarea
          id="message"
          label="Message"
          rows={4}
          placeholder="How can we help you?"
          value={form.message}
          onChange={update("message")}
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-bold text-white transition-all hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Sending..." : "Send Inquiry"}
          {!submitting && <Icon name="send" className="text-xl" />}
        </button>
      </form>
    </div>
  );
}
