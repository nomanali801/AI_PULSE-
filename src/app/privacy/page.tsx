import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Fieldnotes handles information and advertising.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold text-indigo-600">The essentials</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-slate-500">
        Last updated: November 7, 2026
      </p>

      <div className="article-content mt-10">
        <p>
          This Privacy Policy explains how Fieldnotes (&quot;we,&quot;
          &quot;our,&quot; or &quot;us&quot;) handles information when you visit
          this website. By using the site, you acknowledge the practices
          described below.
        </p>

        <h2>Information we collect</h2>
        <p>
          We do not require an account to read articles and do not intentionally
          collect names, email addresses, or other personal information through
          the site unless you voluntarily provide it. Our hosting provider and
          security services may process technical information such as your IP
          address, browser type, device information, referring URL, requested
          pages, and request timestamps to deliver, maintain, and protect the
          site. We use this information only for those operational purposes and
          to investigate abuse or technical problems.
        </p>

        <h2>Cookies</h2>
        <p>
          This site may use cookies and similar technologies. Cookies are small
          files stored on your device that help pages function, remember
          preferences, measure site performance, and support advertising. Some
          cookies are strictly necessary for the site to operate; other
          cookies are optional and are used only where permitted by applicable
          law. You can control or delete cookies through your browser settings,
          although disabling them may affect site functionality.
        </p>

        <h2>Google AdSense and third-party cookies</h2>
        <p>
          We may use Google AdSense to display advertisements. Google and its
          advertising partners may use third-party cookies, web beacons, or
          similar technologies to collect information about visits to this and
          other websites, measure advertising performance, and serve
          personalized or non-personalized ads. We do not control these
          third-party technologies or the information practices of Google and
          its partners. Learn more about Google&apos;s practices and manage
          advertising personalization at{" "}
          <a href="https://policies.google.com/technologies/ads">
            Google&apos;s advertising policies
          </a>
          . Where required, we request consent before enabling non-essential
          cookies or personalized advertising.
        </p>

        <h2>Affiliate links and disclosures</h2>
        <p>
          Some articles may contain affiliate links. If you follow an
          affiliate link and make a purchase or take another qualifying action,
          we may receive a commission at no additional cost to you. Affiliate
          relationships do not change the price you pay, and we aim to
          recommend products or services based on their usefulness and
          relevance. Any third-party purchase is governed by that provider&apos;s
          terms and privacy policy.
        </p>

        <h2>Third-party websites and services</h2>
        <p>
          This site may link to third-party websites, tools, advertisements,
          or services. Those providers operate independently and have their
          own privacy policies and terms. We are not responsible for their
          content, security, cookies, or information practices. Review their
          policies before submitting information or completing a transaction.
        </p>

        <h2>Data retention and security</h2>
        <p>
          We retain operational information only for as long as reasonably
          necessary for the purposes described in this policy, to comply with
          legal obligations, resolve disputes, and enforce agreements. No
          method of transmission or storage is completely secure, but we use
          reasonable safeguards appropriate to the nature of the information
          handled by the site.
        </p>

        <h2>Your choices and rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, restrict, or object to certain processing of your personal
          information, as well as rights relating to targeted advertising.
          You may also have the right to withdraw consent where processing is
          based on consent. To exercise applicable rights or ask a question,
          contact the website owner using the contact details published on this
          site. You may also manage cookies in your browser and advertising
          preferences through Google&apos;s settings.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy as the site or applicable requirements
          change. The updated date above indicates when changes were last made.
        </p>
      </div>
    </article>
  );
}
