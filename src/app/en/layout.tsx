export default function EnLayout({ children }: { children: React.ReactNode }) {
  // Root <html> is static (lang="ko"); this scopes the correct language to the subtree for crawlers and screen readers.
  return <div lang="en">{children}</div>;
}
