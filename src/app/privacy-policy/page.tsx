import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | MAXX Energy Services",
  description:
    "How MAXX Energy Services collects, uses, shares, and protects personal information, including information received through LinkedIn Lead Gen Forms and our website.",
};

const EMAIL = "information@maxxenergysvcs.com";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-maxx-900 mt-12 mb-4 scroll-mt-28">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-maxx-900 mt-8 mb-3">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-maxx-700 leading-relaxed mb-4">{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-3 mb-4">{children}</ul>;
}

function LI({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-maxx-700 leading-relaxed">
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-maxx-accent shrink-0" />
      <span>
        {label && <strong className="text-maxx-900">{label}</strong>}
        {label && " — "}
        {children}
      </span>
    </li>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-maxx-600 underline decoration-maxx-accent/50 underline-offset-2 hover:text-maxx-accent transition-colors"
    >
      {children}
    </a>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-maxx-900">
        <div className="absolute inset-0 bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-maxx-mint font-semibold tracking-wider uppercase text-sm mb-4">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-maxx-200">
            Effective date: September 16, 2026 <span className="mx-2 text-maxx-400">|</span> Last
            updated: September 16, 2026
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-16 sm:h-20"
          >
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <P>
            MAXX Energy Services (&ldquo;MAXX,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) provides chemical supply, distribution, and containment solutions
            to the oil and gas, agriculture, industrial, mining, municipal water, and energy
            recovery sectors. This Privacy Policy explains what information we collect, how we use
            it, when we share it, and the choices available to you.
          </P>
          <P>
            This policy applies to information we collect through our website at
            maxxenergysvcs.com, through our advertising on LinkedIn and other platforms (including
            LinkedIn Lead Gen Forms), and through direct business communications such as email,
            phone, and quote requests.
          </P>

          <div className="my-8 border-l-4 border-maxx-accent bg-maxx-50 rounded-r-xl px-6 py-5">
            <p className="text-maxx-800 leading-relaxed">
              <strong className="text-maxx-900">LinkedIn advertising in brief:</strong> If you
              submit a LinkedIn Lead Gen Form from one of our ads, LinkedIn shares the contact and
              professional details you confirmed on that form with MAXX Energy Services. We use
              that information solely to respond to your inquiry and to contact you about our
              chemical and containment products and services. You can ask us to stop contacting
              you at any time by emailing <A href={`mailto:${EMAIL}`}>{EMAIL}</A>.
            </p>
          </div>

          <H2 id="information-we-collect">Information We Collect</H2>

          <H3>Information you provide directly</H3>
          <UL>
            <LI label="Contact and professional details">
              name, business email address, phone number, company name, job title, and location.
            </LI>
            <LI label="Inquiry details">
              the products, chemicals, containment solutions, basins or job sites, volumes,
              timelines, and other information you include in a request for a quote, catalog, or
              consultation.
            </LI>
            <LI label="Correspondence">
              the content of emails, form submissions, and phone or text conversations with our
              sales and service teams.
            </LI>
          </UL>

          <H3>Information collected through LinkedIn advertising</H3>
          <P>
            We advertise on LinkedIn and may use LinkedIn Lead Gen Forms, which pre-fill fields
            with information from your LinkedIn profile. When you choose to submit the form,
            LinkedIn provides us with the fields shown on that form — typically your name, email
            address, company, job title, and country or region — along with your responses to any
            custom questions we include. LinkedIn&apos;s own handling of your data is governed by
            the <A href="https://www.linkedin.com/legal/privacy-policy">LinkedIn Privacy Policy</A>.
            We do not control LinkedIn&apos;s practices, and this policy does not replace them.
          </P>

          <H3>Information collected automatically</H3>
          <UL>
            <LI label="Usage and device data">
              IP address, browser and device type, operating system, referring URL, pages viewed,
              and time on page.
            </LI>
            <LI label="Cookies and similar technologies">
              including analytics cookies and advertising tags. We may use the LinkedIn Insight
              Tag on our website for conversion tracking, website demographics, and retargeting of
              visitors with MAXX ads on LinkedIn. We may also use Google Analytics, Google Ads
              conversion tracking, and similar tools.
            </LI>
          </UL>

          <H2 id="how-we-use">How We Use Your Information</H2>
          <UL>
            <LI>Respond to quote requests, product questions, catalog requests, and other inquiries.</LI>
            <LI>
              Contact you by email, phone, or text about MAXX chemical and containment products,
              pricing, availability, and service capabilities.
            </LI>
            <LI>
              Send marketing communications, including newsletters, product updates, and event or
              trade show invitations, where permitted by law.
            </LI>
            <LI>
              Qualify, route, and manage sales leads in our customer relationship management (CRM)
              system.
            </LI>
            <LI>
              Fulfill orders, deliveries, and service agreements, and provide customer and
              technical support.
            </LI>
            <LI>
              Measure and improve the performance of our website and advertising campaigns,
              including LinkedIn campaigns.
            </LI>
            <LI>
              Maintain safety, security, and regulatory records, and comply with legal, tax,
              environmental, and transportation obligations.
            </LI>
          </UL>

          <H2 id="how-we-share">How We Share Information</H2>
          <P>
            <strong className="text-maxx-900">We do not sell your personal information.</strong> We
            share information only as described below:
          </P>
          <UL>
            <LI label="Service providers">
              CRM, email marketing, hosting, analytics, advertising, logistics, and IT vendors that
              process information on our behalf under contract and are not permitted to use it for
              their own purposes.
            </LI>
            <LI label="Advertising platforms">
              LinkedIn, Google, and similar platforms in connection with campaign delivery,
              conversion measurement, and audience matching.
            </LI>
            <LI label="Affiliates and business partners">
              where needed to supply, blend, transport, or service the products you request.
            </LI>
            <LI label="Legal and safety">
              when required by law, subpoena, or regulation, or to protect the rights, property,
              or safety of MAXX Energy Services, our customers, or the public.
            </LI>
            <LI label="Business transfers">
              in connection with a merger, acquisition, financing, or sale of assets, subject to
              this policy.
            </LI>
          </UL>

          <H2 id="your-choices">Your Choices</H2>
          <UL>
            <LI label="Email opt-out">
              every marketing email includes an unsubscribe link. You may also email{" "}
              <A href={`mailto:${EMAIL}?subject=Unsubscribe`}>{EMAIL}</A> with
              &ldquo;Unsubscribe&rdquo; in the subject line.
            </LI>
            <LI label="Calls and texts">
              tell any MAXX representative to remove you from call or text lists, or reply STOP to
              a text message.
            </LI>
            <LI label="Cookies and ad tags">
              you can manage cookies in your browser settings. You can control LinkedIn ad and
              data settings in your{" "}
              <A href="https://www.linkedin.com/psettings/advertising">
                LinkedIn advertising preferences
              </A>
              , and opt out of Google Analytics using the{" "}
              <A href="https://tools.google.com/dlpage/gaoptout">
                Google Analytics opt-out browser add-on
              </A>
              .
            </LI>
            <LI label="Access, correction, or deletion">
              email us to review, correct, or request deletion of the information we hold about
              you.
            </LI>
          </UL>

          <H2 id="your-privacy-rights">Your Privacy Rights</H2>
          <P>
            Depending on where you live, you may have the right to confirm whether we process your
            personal data, obtain a copy of it, correct inaccuracies, request deletion, opt out of
            targeted advertising or the sale of personal data, and appeal a denial of any of these
            requests. These rights are provided under laws including the Texas Data Privacy and
            Security Act and comparable state privacy laws. To exercise a right, email{" "}
            <A href={`mailto:${EMAIL}`}>{EMAIL}</A> with the details of your request. We will
            verify your identity before responding and will not discriminate against you for making
            a request. If we deny your request, you may appeal by replying to our decision, and we
            will respond to the appeal within the time required by applicable law.
          </P>

          <H2 id="data-retention">Data Retention</H2>
          <P>
            We keep personal information for as long as needed to respond to your inquiry, maintain
            our business relationship, and satisfy legal, tax, safety, and regulatory recordkeeping
            requirements. Lead records that do not result in a business relationship are
            periodically reviewed and removed from active marketing lists.
          </P>

          <H2 id="data-security">Data Security</H2>
          <P>
            We use administrative, technical, and physical safeguards designed to protect personal
            information against loss, misuse, and unauthorized access, including access controls,
            encrypted transmission of web form data, and vendor due diligence. No method of
            transmission or storage is completely secure, and we cannot guarantee absolute
            security.
          </P>

          <H2 id="childrens-privacy">Children&apos;s Privacy</H2>
          <P>
            Our website and services are directed to businesses and industrial customers. We do
            not knowingly collect personal information from anyone under 16 years of age. If you
            believe a child has provided us information, contact us and we will delete it.
          </P>

          <H2 id="third-party-links">Third-Party Links</H2>
          <P>
            Our website and ads may link to third-party sites and resources, such as our product
            catalog host or safety data sheet libraries. We are not responsible for the privacy
            practices of those sites, and we encourage you to review their policies.
          </P>

          <H2 id="changes">Changes to This Policy</H2>
          <P>
            We may update this Privacy Policy from time to time. The effective date at the top of
            the page reflects the most recent version. Material changes will be posted on this
            page.
          </P>

          <H2 id="contact-us">Contact Us</H2>
          <P>Questions about this policy, or requests regarding your personal information:</P>
          <address className="not-italic bg-maxx-50 border border-maxx-100 rounded-2xl p-6 text-maxx-700 leading-relaxed">
            <strong className="text-maxx-900">MAXX Energy Services</strong>
            <br />
            Godley, Texas, USA
            <br />
            Email: <A href={`mailto:${EMAIL}`}>{EMAIL}</A>
            <br />
            Phone: <A href="tel:1-833-777-6299">1-833-777-MAXX (6299)</A>
            <br />
            Web: <Link href="/" className="text-maxx-600 underline decoration-maxx-accent/50 underline-offset-2 hover:text-maxx-accent transition-colors">maxxenergysvcs.com</Link>
          </address>
        </article>
      </section>
    </>
  );
}
