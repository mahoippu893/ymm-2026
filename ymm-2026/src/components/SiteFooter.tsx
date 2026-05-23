import { SITE_FOOTER_LINES } from '../config/siteFooter'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      {SITE_FOOTER_LINES.map((line) => (
        <p key={line} className="site-footer__line">
          {line}
        </p>
      ))}
    </footer>
  )
}
