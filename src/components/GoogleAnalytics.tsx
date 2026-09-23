import Script from "next/script";

const GA_ID = "G-NW4JFZE5MJ";

/**
 * Google Analytics 4 (gtag.js). Rendered once from the root layout so it
 * loads on every page. The measurement id is public by design.
 */
export default function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
