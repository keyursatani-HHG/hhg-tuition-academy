import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us | HHG Tuition Academy",
  description:
    "Get in touch with HHG Tuition Academy. Have questions about our curriculum or enrollment? Our academic advisors are here to help.",
};

const contactItems = [
  {
    icon: "location_on",
    title: "Address",
    value: siteConfig.contact.address,
  },
  { icon: "call", title: "Phone", value: siteConfig.contact.phone },
  { icon: "mail", title: "Email", value: siteConfig.contact.email },
];

export default function ContactPage() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <h1 className="mb-4 text-[40px] font-bold leading-tight tracking-[-0.02em] text-on-surface md:text-display">
            Get in Touch
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Have questions about our curriculum or enrollment process? Our
            academic advisors are here to guide you toward the right learning
            path for your child.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-5">
          {/* Contact info + map */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-surface-container-high bg-white p-8 ambient-shadow">
              <h3 className="mb-6 text-headline-md font-semibold text-on-surface">
                Contact Information
              </h3>
              <div className="flex flex-col gap-6">
                {contactItems.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-surface-container">
                      <Icon name={item.icon} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-label-md font-bold text-on-surface">
                        {item.title}
                      </div>
                      <div className="text-body-md text-on-surface-variant">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative flex min-h-[220px] flex-grow items-center justify-center overflow-hidden rounded-2xl bg-surface-container">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,#e7eefe_0%,#dce2f3_100%)]" />
              <div className="relative flex flex-col items-center gap-2 text-primary">
                <Icon name="location_on" className="text-5xl" filled />
                <span className="text-label-md font-semibold">
                  {siteConfig.name}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
