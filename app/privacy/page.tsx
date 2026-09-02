import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for InfoMyth Web Service.",
};

export default function PrivacyPage() {
  return (
    <main className="container py-24">
      <h1 className="font-heading text-4xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mt-4 text-muted">Last updated: September 2026</p>

      <div className="mt-10 max-w-3xl space-y-8 text-muted">
        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Information we collect</h2>
          <p className="mt-2">
            We collect information you provide when you contact us, book a consultation, or request a free
            consultation. This includes your name, email, phone number, company, and project details.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">How we use information</h2>
          <p className="mt-2">
            We use your information to respond to inquiries, provide quotes, schedule consultations, and deliver
            our services. We do not sell your personal information.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Data security</h2>
          <p className="mt-2">
            We implement reasonable security measures, including rate limiting, input validation, and access
            controls, to protect your data.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Contact us</h2>
          <p className="mt-2">
            If you have questions about this privacy policy, email us at{" "}
            <a href="mailto:hello.infomyth@gmail.com" className="text-accent hover:underline">
              hello.infomyth@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
