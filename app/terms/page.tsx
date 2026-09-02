import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for InfoMyth Web Service.",
};

export default function TermsPage() {
  return (
    <main className="container py-24">
      <h1 className="font-heading text-4xl font-bold text-foreground">Terms of Service</h1>
      <p className="mt-4 text-muted">Last updated: September 2026</p>

      <div className="mt-10 max-w-3xl space-y-8 text-muted">
        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Overview</h2>
          <p className="mt-2">
            These terms govern your use of the InfoMyth Web Service website and the services we provide. By using
            this site, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Services</h2>
          <p className="mt-2">
            We provide web design, web development, and related consulting services. Project timelines, pricing, and
            deliverables are defined in a separate proposal or statement of work.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Payments</h2>
          <p className="mt-2">
            Unless otherwise agreed, projects require a 50% deposit to start and 50% on launch. Custom and enterprise
            projects may have different payment terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Intellectual property</h2>
          <p className="mt-2">
            Upon full payment, the client receives ownership of the final deliverables. We retain the right to use
            anonymized portfolio samples unless otherwise agreed.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Limitation of liability</h2>
          <p className="mt-2">
            Our liability is limited to the amount paid for the specific service in question. We are not liable for
            indirect, incidental, or consequential damages.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-semibold text-foreground">Contact</h2>
          <p className="mt-2">
            For questions about these terms, email{" "}
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
