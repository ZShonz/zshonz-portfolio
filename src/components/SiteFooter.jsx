export default function SiteFooter({ onContact }) {
  return <footer className="site-footer">
    <div className="footer-bottom"><span>© {new Date().getFullYear()} ZShonz</span><span>感谢观展 / THANK YOU FOR VISITING</span><button onClick={() => { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); document.querySelector('.identity')?.focus({ preventScroll: true }); }}>回到顶部 ↑</button></div>
  </footer>;
}

