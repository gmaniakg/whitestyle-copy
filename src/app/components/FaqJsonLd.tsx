/**
 * FAQPage JSON-LD generated from the FAQ that is actually rendered on the page,
 * so markup and visible content can never drift apart (and it is localized).
 * Render only on pages that show this FAQ (the home page in each language).
 */
export default function FaqJsonLd({ faqs, lang }: { faqs: { q: string; a: string }[]; lang: 'ko' | 'ja' | 'en' }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          inLanguage: lang,
          mainEntity: faqs.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }),
      }}
    />
  );
}
