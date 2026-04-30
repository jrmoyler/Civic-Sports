import { useState, useEffect, useContext, createContext, useRef, useCallback } from 'react';

// ── CONTEXT ────────────────────────────────────────────────────────────────────
const Ctx = createContext(null);
const useApp = () => useContext(Ctx);

const AppProvider = ({ children }) => {
  const [page, setPage]           = useState('home');
  const [auth, setAuth]           = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser]           = useState(null);

  const navigate = useCallback((p) => {
    setPage(p);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const login = useCallback((email) => {
    setAuth(true);
    setUser({
      name: 'The Johnson Family',
      email,
      memberSince: 'January 2025',
      athleteName: 'Marcus Johnson',
      sport: 'Basketball',
      phase: 'Foundation Audit Complete',
    });
    navigate('dashboard');
  }, [navigate]);

  const logout = useCallback(() => {
    setAuth(false);
    setUser(null);
    navigate('home');
  }, [navigate]);

  return (
    <Ctx.Provider value={{ page, navigate, auth, login, logout, mobileMenu, setMobileMenu, user }}>
      {children}
    </Ctx.Provider>
  );
};

// ── ICONS (inline SVG — single consistent system, Heroicons 2 style) ───────────
const Ic = {
  Logo: ({ className = '', ...p }) => {
    const [err, setErr] = useState(false);
    if (err) return (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className={className} aria-hidden="true" {...p}>
        <path d="M17 2L31 9V25L17 32L3 25V9L17 2Z" fill="url(#logoGrad)"/>
        <path d="M17 9L23 13V21L17 25L11 21V13L17 9Z" fill="white" fillOpacity=".18"/>
        <path d="M17 14L19.5 16V19L17 21L14.5 19V16L17 14Z" fill="white"/>
        <defs>
          <linearGradient id="logoGrad" x1="3" y1="2" x2="31" y2="32">
            <stop stopColor="#c48726"/>
            <stop offset="1" stopColor="#e0a835"/>
          </linearGradient>
        </defs>
      </svg>
    );
    return (
      <img
        src="/logo.png"
        alt="Civic Sports logo"
        width="36"
        height="36"
        className={`w-9 h-9 object-contain bg-white rounded-md ${className}`}
        onError={() => setErr(true)}
        {...p}
      />
    );
  },
  Menu:       ({ className = '', ...p }) => <svg className={`w-6 h-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>,
  X:          ({ className = '', ...p }) => <svg className={`w-6 h-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>,
  Check:      ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>,
  CheckCircle:({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  ArrowRight: ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>,
  ChevronDown:({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>,
  ChevronRight:({ className = '', ...p }) => <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>,
  Star:       ({ className = '', ...p }) => <svg className={`w-4 h-4 ${className}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...p}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  User:       ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>,
  Users:      ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>,
  Target:     ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>,
  Trophy:     ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228"/></svg>,
  Shield:     ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
  Mail:       ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>,
  Phone:      ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>,
  MapPin:     ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>,
  Lock:       ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>,
  Bell:       ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/></svg>,
  Calendar:   ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>,
  Clock:      ({ className = '', ...p }) => <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Download:   ({ className = '', ...p }) => <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>,
  Document:   ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>,
  Activity:   ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>,
  Trending:   ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg>,
  Dashboard:  ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>,
  Chat:       ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/></svg>,
  Clipboard:  ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/></svg>,
  Send:       ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>,
  Logout:     ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>,
  Lightbulb:  ({ className = '', ...p }) => <svg className={`w-5 h-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>,
};

// ── INTERSECTION OBSERVER ANIMATION WRAPPER ────────────────────────────────────
const AnimSect = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${vis ? 'animate-fade-up' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ── NAVBAR ─────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { page, navigate, auth, mobileMenu, setMobileMenu, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const isDark = page === 'home' || page === 'services';

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { n: 'Home',     id: 'home' },
    { n: 'Services', id: 'services' },
    { n: 'About',    id: 'about' },
    { n: 'FAQ',      id: 'faq' },
    { n: 'Contact',  id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? isDark ? 'glass-dark py-3 shadow-xl' : 'glass-cream py-3 shadow-md'
          : isDark ? 'bg-transparent py-5' : 'bg-cream-100/80 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button
          type="button"
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('home')}
          aria-label="Civic Sports — Home"
        >
          <Ic.Logo />
          <span className={`font-display text-xl font-semibold tracking-wide ${isDark && !scrolled ? 'text-white' : 'text-ink-900'}`}>
            Civic Sports
          </span>
        </button>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button type="button"
              key={l.id}
              onClick={() => navigate(l.id)}
              aria-current={page === l.id ? 'page' : undefined}
              className={`text-sm font-medium transition-colors ${
                page === l.id
                  ? 'text-gold-500'
                  : isDark && !scrolled
                    ? 'text-ink-300 hover:text-white'
                    : 'text-ink-600 hover:text-ink-900'
              }`}
            >
              {l.n}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {auth ? (
            <>
              <button type="button"
                onClick={() => navigate('dashboard')}
                className={`text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  isDark && !scrolled ? 'text-ink-300 hover:text-white' : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                <Ic.User /> Dashboard
              </button>
              <button type="button" onClick={logout} className="btn-outline-ink text-sm font-semibold py-2 px-5 rounded-full">
                Log out
              </button>
            </>
          ) : (
            <>
              <button type="button"
                onClick={() => navigate('login')}
                className={`text-sm font-medium transition-colors ${
                  isDark && !scrolled ? 'text-ink-300 hover:text-white' : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                Client Login
              </button>
              <button type="button" onClick={() => navigate('intake')} className="btn-gold text-sm py-2.5 px-6 rounded-full shadow-lg">
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button type="button"
          className={`md:hidden p-1.5 ${isDark && !scrolled ? 'text-white' : 'text-ink-900'}`}
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-expanded={mobileMenu}
          aria-controls="mobile-nav"
          aria-label={mobileMenu ? 'Close menu' : 'Open menu'}
        >
          {mobileMenu ? <Ic.X /> : <Ic.Menu />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileMenu && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden absolute top-full left-0 w-full bg-white border-t border-cream-300 shadow-xl animate-slide-down"
        >
          <div className="px-6 py-5 flex flex-col gap-1">
            {links.map((l) => (
              <button type="button"
                key={l.id}
                onClick={() => navigate(l.id)}
                aria-current={page === l.id ? 'page' : undefined}
                className={`text-left py-3 px-3 rounded-lg text-base font-medium transition-colors ${
                  page === l.id ? 'text-gold-600 bg-gold-50' : 'text-ink-700 hover:bg-cream-200'
                }`}
              >
                {l.n}
              </button>
            ))}
            <div className="border-t border-cream-300 pt-4 mt-2 flex flex-col gap-2">
              {auth ? (
                <button type="button" onClick={() => navigate('dashboard')} className="btn-ink py-3 rounded-xl font-semibold flex justify-center items-center gap-2">
                  <Ic.Dashboard /> Go to Dashboard
                </button>
              ) : (
                <>
                  <button type="button" onClick={() => navigate('login')} className="btn-outline-ink py-3 rounded-xl font-medium text-center">
                    Client Login
                  </button>
                  <button type="button" onClick={() => navigate('intake')} className="btn-gold py-3 rounded-xl font-semibold text-center">
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

// ── FOOTER ─────────────────────────────────────────────────────────────────────
const Footer = () => {
  const { navigate } = useApp();
  const services = ['Foundation Audit', 'Managed Growth Retainer', 'Recruitment Roadmap', 'Executive Elite', 'Life After Sports Seminar', 'Civic Compliance Audit'];
  const companyLinks = [['About', 'about'], ['Services', 'services'], ['FAQ', 'faq'], ['Contact', 'contact']];

  return (
    <footer className="section-dark pt-20 pb-10 border-t border-ink-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Ic.Logo />
              <span className="font-display text-xl font-semibold text-white">Civic Sports Consulting</span>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed">
              Elite sports consulting for student-athletes and families. NIL strategy, recruitment roadmaps, and compliance-grade guidance — built by a practitioner who has worn the jersey.
            </p>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase">Services</h2>
            <ul className="space-y-3 text-ink-400 text-sm">
              {services.map((s) => (
                <li key={s}>
                  <span className="hover:text-gold-400 transition-colors cursor-default">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase">Company</h2>
            <ul className="space-y-3 text-ink-400 text-sm">
              {companyLinks.map(([n, id]) => (
                <li key={id}>
                  <button type="button" onClick={() => navigate(id)} className="hover:text-gold-400 transition-colors text-left">
                    {n}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-white font-semibold mb-5 text-sm tracking-widest uppercase">Contact</h2>
            <address className="not-italic space-y-3 text-ink-400 text-sm">
              <div className="flex items-start gap-2.5">
                <Ic.MapPin className="text-gold-500 shrink-0 w-4 h-4 mt-0.5" />
                <span>Columbus, Ohio</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Ic.Mail className="text-gold-500 w-4 h-4" />
                <a href="mailto:contact@civicsports.com" className="hover:text-gold-400 transition-colors">
                  contact@civicsports.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ink-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ink-600 text-sm">
            &copy; {new Date().getFullYear()} Civic Sports Consulting. All rights reserved.
          </p>
          <div className="flex gap-6 text-ink-600 text-sm">
            <span className="hover:text-ink-300 cursor-default transition-colors">Privacy Policy</span>
            <span className="hover:text-ink-300 cursor-default transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ── HOME ───────────────────────────────────────────────────────────────────────
const Home = () => {
  const { navigate } = useApp();

  const steps = [
    { n: '01', title: 'Schedule & Pay', desc: 'Pick a time, complete the $350 payment, and sign the consultant disclaimer — all in one streamlined flow.' },
    { n: '02', title: 'Foundation Audit', desc: 'A deep-dive into academic eligibility, social media compliance, recruitment readiness, and NIL exposure. Honest. Thorough. Documented.' },
    { n: '03', title: 'Your Private Dashboard', desc: 'Receive a live roadmap, shared document hub, and ongoing advisory access inside your secure client portal — strategy you can execute.' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center hero-bg hero-pattern overflow-hidden" aria-label="Hero">
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(196,135,38,.2) 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">
          <div className="max-w-3xl">
            <AnimSect>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink-700 bg-ink-800/60 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-ring" aria-hidden="true" />
                Now Accepting New Athletes &amp; Families
              </div>

              <h1 className="font-display text-6xl md:text-8xl font-semibold text-white leading-none mb-6 tracking-tight">
                The Athlete Is<br />
                the Talent.<br />
                <em className="gold-text not-italic">Let&rsquo;s Build the Business.</em>
              </h1>

              <p className="text-ink-300 text-xl leading-relaxed mb-10 max-w-xl font-light">
                NIL strategy, recruitment roadmaps, and compliance-grade guidance for elite student-athletes and their families — built by a practitioner who has worn the jersey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button type="button"
                  onClick={() => navigate('intake')}
                  className="btn-gold py-4 px-9 rounded-full text-base font-semibold flex items-center justify-center gap-2 shadow-xl"
                >
                  Get Your Athlete Assessed <Ic.ArrowRight />
                </button>
                <button type="button"
                  onClick={() => navigate('services')}
                  className="btn-ghost py-4 px-9 rounded-full text-base font-semibold flex items-center justify-center"
                >
                  View Services
                </button>
              </div>
            </AnimSect>
          </div>
        </div>

        {/* Stats ribbon */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-ink-800/60 bg-ink-900/70 backdrop-blur-sm" aria-label="At a glance">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink-800/60">
              {[
                ['D1 / D2', 'Athlete Focus'],
                ['NIL', 'Compliance'],
                ['NCAA', 'Eligibility'],
                ['48hr', 'Response Time'],
              ].map(([v, l], i) => (
                <div key={i} className="text-center py-6 px-4">
                  <div className="font-display text-3xl font-semibold text-gold-400 mb-1">{v}</div>
                  <div className="text-ink-500 text-xs tracking-wider uppercase font-medium">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-28 section-cream" aria-labelledby="for-heading">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSect className="mb-16 max-w-2xl">
            <div className="divider-gold mb-5" aria-hidden="true" />
            <h2 id="for-heading" className="font-display text-5xl font-semibold text-ink-900 leading-tight mb-4">
              Stop hoping for the best.<br />Start operating with strategy.
            </h2>
            <p className="text-ink-500 text-lg">
              We work directly with athletes and families — providing objective assessments, compliance guidance, and the professional-grade roadmaps the recruiting world is missing.
            </p>
          </AnimSect>

          <div className="grid md:grid-cols-2 gap-8">
            <AnimSect delay={100} className="card p-10 card-hover">
              <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 mb-7" aria-hidden="true">
                <Ic.User />
              </div>
              <h3 className="font-display text-3xl font-semibold text-ink-900 mb-3">For Parents</h3>
              <p className="text-ink-500 leading-relaxed mb-6">
                Your child has the talent. You deserve a team that tells you the truth about where they stand, what&rsquo;s realistic, and how to spend your time and money wisely — without the hype or the pressure.
              </p>
              <ul className="space-y-2.5" aria-label="What parents receive">
                {[
                  'Objective athlete assessment & honest feedback',
                  'Eligibility & compliance clarity',
                  'Roadmap for club, high school & collegiate navigation',
                ].map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-ink-700 text-sm">
                    <Ic.CheckCircle className="text-sage-500 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </AnimSect>

            <AnimSect delay={200} className="card p-10 card-hover">
              <div className="w-14 h-14 rounded-2xl bg-sage-50 border border-sage-200 flex items-center justify-center text-sage-600 mb-7" aria-hidden="true">
                <Ic.Target />
              </div>
              <h3 className="font-display text-3xl font-semibold text-ink-900 mb-3">For Athletes</h3>
              <p className="text-ink-500 leading-relaxed mb-6">
                You&rsquo;re the talent. We&rsquo;re the architects. Whether you&rsquo;re navigating D1 recruitment, the transfer portal, or your first NIL deal — we give you the structural blueprint to move with confidence and compliance.
              </p>
              <ul className="space-y-2.5" aria-label="What athletes receive">
                {[
                  'NIL negotiation & disclosure support',
                  'NCAA eligibility & social media compliance',
                  '12-month recruitment strategy & school targeting',
                ].map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-ink-700 text-sm">
                    <Ic.CheckCircle className="text-sage-500 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
            </AnimSect>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-28 section-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSect className="text-center mb-20">
            <div className="divider-gold mx-auto mb-5" aria-hidden="true" />
            <h2 id="process-heading" className="font-display text-5xl font-semibold text-ink-900 mb-4">A structured, proven process.</h2>
            <p className="text-ink-500 text-lg max-w-xl mx-auto">
              No guesswork. No generic advice. A deliberate system designed to surface truth and build momentum.
            </p>
          </AnimSect>

          <ol className="grid md:grid-cols-3 gap-12 relative list-none p-0 m-0">
            {steps.map((step, i) => (
              <AnimSect key={i} delay={i * 120} className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 rounded-full bg-ink-900 text-white flex items-center justify-center font-display text-2xl font-semibold mb-7 border-4 border-cream-200 shadow-lg relative z-10"
                  aria-hidden="true"
                >
                  {step.n}
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink-900 mb-3">{step.title}</h3>
                <p className="text-ink-500 leading-relaxed text-sm">{step.desc}</p>
              </AnimSect>
            ))}
          </ol>
        </div>
      </section>

      {/* EARLY STAGE NOTE — replaces placeholder testimonials */}
      <section className="py-28 section-cream" aria-labelledby="social-heading">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSect className="text-center mb-16">
            <div className="divider-gold mx-auto mb-5" aria-hidden="true" />
            <h2 id="social-heading" className="font-display text-5xl font-semibold text-ink-900">Built for Serious Athletes</h2>
          </AnimSect>
          <div className="max-w-3xl mx-auto">
            <AnimSect className="card p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-ink-900 flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <Ic.Trophy className="text-gold-400 w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-ink-900 mb-4">Early &amp; Intentional</h3>
              <p className="text-ink-500 leading-relaxed mb-8 max-w-xl mx-auto">
                We are selectively onboarding our first cohort of athletes and families. Every submission is personally reviewed. If we are a fit, you will hear from us within 48 hours.
              </p>
              <button type="button" onClick={() => navigate('intake')} className="btn-gold py-3.5 px-8 rounded-full font-semibold inline-flex items-center gap-2">
                Submit Your Intake <Ic.ArrowRight />
              </button>
            </AnimSect>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-28 section-dark relative overflow-hidden" aria-labelledby="cta-heading">
        <div
          className="absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(196,135,38,.3) 0%, transparent 60%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <AnimSect>
            <h2 id="cta-heading" className="font-display text-5xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              The athlete is the talent.<br />Let&rsquo;s build the business.
            </h2>
            <p className="text-ink-300 text-xl mb-10 max-w-xl mx-auto leading-relaxed font-light">
              Every submission is personally reviewed. If we are a fit, you will hear from us within 48 hours to discuss next steps.
            </p>
            <button type="button"
              onClick={() => navigate('intake')}
              className="btn-gold py-4 px-10 rounded-full text-base font-semibold inline-flex items-center gap-2 shadow-xl"
            >
              Get Your Athlete Assessed <Ic.ArrowRight />
            </button>
          </AnimSect>
        </div>
      </section>
    </div>
  );
};

// ── SERVICES ───────────────────────────────────────────────────────────────────
const Services = () => {
  const { navigate } = useApp();

  const plans = [
    {
      name: 'Foundation Audit',
      price: '$350',
      period: 'one-time',
      desc: 'The starting point. A comprehensive deep-dive into academic eligibility, social media compliance, and recruitment readiness.',
      icon: <Ic.Shield />,
      features: [
        'Academic eligibility review',
        'Social media compliance audit',
        'Recruitment readiness assessment',
        'NIL exposure analysis',
        'Detailed report delivered to dashboard',
      ],
    },
    {
      name: 'Recruitment Roadmap',
      price: '$1,200',
      period: 'flat rate',
      desc: 'A 12-month targeted strategy for high schoolers navigating the transfer portal and scholarship offers.',
      icon: <Ic.Target />,
      highlight: true,
      features: [
        'Full 12-month strategic plan',
        'Transfer portal navigation',
        'Scholarship offer evaluation',
        'Target school shortlist & outreach strategy',
        'Milestone tracking in your portal',
      ],
    },
    {
      name: 'Managed Growth',
      price: '$225',
      period: 'per month',
      desc: 'Ongoing contract review, brand management, and monthly eligibility check-ins for active athletes.',
      icon: <Ic.Trending />,
      features: [
        'Monthly eligibility check-ins',
        'Brand & social media management',
        'Contract review support',
        'NIL compliance monitoring',
        'Priority access to advisor',
      ],
    },
  ];

  return (
    <div className="section-dark min-h-screen">
      <section className="pt-40 pb-20" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSect className="text-center mb-20">
            <div className="divider-gold mx-auto mb-5" aria-hidden="true" />
            <h1 id="services-heading" className="font-display text-6xl font-semibold text-white mb-4">Consulting Packages</h1>
            <p className="text-ink-300 text-xl max-w-xl mx-auto font-light">
              Tailored strategies designed for every stage of the athletic journey.
            </p>
          </AnimSect>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {plans.map((plan, i) => (
              <AnimSect
                key={i}
                delay={i * 120}
                className={`rounded-3xl p-8 relative transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-white ring-2 ring-gold-400 shadow-2xl md:-translate-y-4'
                    : 'bg-ink-900 border border-ink-800'
                }`}
              >
                {plan.highlight && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-ink-950 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
                    aria-label="Most popular plan"
                  >
                    Most Popular
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    plan.highlight ? 'bg-gold-100 text-gold-700' : 'bg-ink-800 text-gold-400'
                  }`}
                  aria-hidden="true"
                >
                  {plan.icon}
                </div>

                <h2 className={`font-display text-2xl font-semibold mb-2 ${plan.highlight ? 'text-ink-900' : 'text-white'}`}>
                  {plan.name}
                </h2>
                <p className={`text-sm mb-6 min-h-[40px] ${plan.highlight ? 'text-ink-500' : 'text-ink-400'}`}>
                  {plan.desc}
                </p>

                <div className="mb-8 flex items-end gap-1">
                  <span className={`font-display text-4xl font-semibold ${plan.highlight ? 'text-ink-900' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm mb-1 ${plan.highlight ? 'text-ink-400' : 'text-ink-500'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8" aria-label={`${plan.name} features`}>
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-start gap-2.5 text-sm ${plan.highlight ? 'text-ink-700' : 'text-ink-300'}`}>
                      <Ic.CheckCircle className={plan.highlight ? 'text-sage-500 shrink-0' : 'text-gold-500 shrink-0'} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button type="button"
                  onClick={() => navigate('intake')}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                    plan.highlight
                      ? 'btn-gold shadow-lg'
                      : 'bg-ink-800 text-white hover:bg-ink-700 border border-ink-700'
                  }`}
                >
                  Get Started
                </button>
              </AnimSect>
            ))}
          </div>

          {/* Additional offerings */}
          <AnimSect className="border border-ink-800 rounded-3xl p-12 bg-ink-900/50">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="w-12 h-12 rounded-xl bg-ink-800 text-gold-400 flex items-center justify-center mb-5" aria-hidden="true">
                  <Ic.Star />
                </div>
                <h2 className="font-display text-2xl font-semibold text-white mb-2">Executive Elite</h2>
                <p className="text-ink-400 text-sm mb-4">
                  High-touch representation, NIL negotiation, and 24/7 strategic advisory for top-tier prospects. Inquiry only — not every athlete qualifies.
                </p>
                <button type="button" onClick={() => navigate('contact')} className="btn-gold py-2.5 px-6 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                  Inquire <Ic.ArrowRight />
                </button>
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-ink-800 text-gold-400 flex items-center justify-center mb-5" aria-hidden="true">
                  <Ic.Users />
                </div>
                <h2 className="font-display text-2xl font-semibold text-white mb-2">Additional Offerings</h2>
                <ul className="space-y-2.5 text-ink-400 text-sm">
                  <li className="flex items-start gap-2">
                    <Ic.ChevronRight className="text-gold-500 shrink-0 mt-0.5" />
                    <span>
                      <span className="text-white font-medium">&ldquo;Life After Sports&rdquo; Seminar</span> — Half-day workshop on financial literacy & professional transition. $2,500 per team/group.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Ic.ChevronRight className="text-gold-500 shrink-0 mt-0.5" />
                    <span>
                      <span className="text-white font-medium">Civic Compliance Audit (B2B)</span> — Institutional NIL risk assessment for small colleges & athletic programs. $5,000.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Disclosure */}
            <div className="mt-10 pt-8 border-t border-ink-800">
              <div className="flex items-start gap-3 bg-ink-800/50 rounded-xl p-5 border border-ink-700">
                <Ic.Shield className="text-gold-400 shrink-0 w-4 h-4 mt-0.5" />
                <p className="text-ink-400 text-xs leading-relaxed">
                  <span className="text-white font-medium">Important Disclosure:</span> Civic Sports Consulting provides expert sports consulting and strategic guidance. We are not a licensed sports agent and do not act as one. We are not tax professionals. All advice is educational and strategic in nature. Clients are encouraged to consult licensed legal and financial professionals for agent representation and tax matters.
                </p>
              </div>
            </div>
          </AnimSect>
        </div>
      </section>
    </div>
  );
};

// ── ABOUT ──────────────────────────────────────────────────────────────────────
const About = () => {
  const { navigate } = useApp();

  return (
    <div className="section-cream min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center py-16">
          <AnimSect>
            <div className="divider-gold mb-6" aria-hidden="true" />
            <h1 className="font-display text-6xl font-semibold text-ink-900 leading-tight mb-6">
              The Architect<br />Behind the Athlete.
            </h1>
            <div className="space-y-5 text-ink-500 leading-relaxed">
              <p>
                At Civic Sports Consulting, we don&rsquo;t just manage sports careers — we engineer them. We provide elite youth and collegiate athletes with the structural blueprint they need to navigate the complexities of NIL, recruitment strategy, and long-term eligibility.
              </p>
              <p>
                We specialize in helping families who are ready to stop &ldquo;hoping for the best&rdquo; and start operating with a professional-grade strategy. Through our Foundation Audit, we turn raw athletic talent into a secure, compliant, and scalable asset.
              </p>
              <p>
                As a former college basketball player, I know the weight of the jersey and the pressure of the scholarship. As a Product Owner in Tech Delivery, I know how to audit systems and build roadmaps that actually deliver results. With a Master of Public Administration and a focus on the legal landscape of sports, I bring a level of professional rigor that the recruiting world is currently missing.
              </p>
              <p className="font-medium text-ink-800">
                I don&rsquo;t just see an athlete. I see a legacy that needs a foundation. Let&rsquo;s build it.
              </p>
            </div>

            <dl className="grid grid-cols-3 gap-6 border-t border-cream-300 pt-8 mt-8">
              {[
                ['Former', 'D1 Athlete'],
                ['MPA', 'Graduate'],
                ['Tech', 'Product Owner'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-4xl font-semibold text-gold-600 mb-1">{v}</dt>
                  <dd className="text-ink-500 text-xs font-medium uppercase tracking-wider">{l}</dd>
                </div>
              ))}
            </dl>

            <button type="button" onClick={() => navigate('intake')} className="btn-ink mt-10 py-3.5 px-8 rounded-full font-semibold inline-flex items-center gap-2">
              Get Your Athlete Assessed <Ic.ArrowRight />
            </button>
          </AnimSect>

          <AnimSect delay={200}>
            <div className="bg-ink-900 rounded-3xl p-10 text-white relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-15"
                aria-hidden="true"
                style={{ background: '#e0a835', transform: 'translate(30%,-30%)' }}
              />
              <h2 className="font-display text-2xl font-semibold mb-8 text-white">The Civic Standard</h2>
              <ul className="space-y-8">
                {[
                  {
                    t: 'Practitioner, Not a Theorist',
                    d: 'Former D1 athlete. Tech Product Owner. MPA graduate. I have been on the field and in the boardroom — and I bring both to every engagement.',
                  },
                  {
                    t: 'Architect-Level Rigor',
                    d: 'We do not give opinions. We build systems. Every athlete receives a documented, compliance-grade strategy they can act on immediately.',
                  },
                  {
                    t: 'Secure Client Dashboard',
                    d: 'Every client receives a private portal with their live roadmap, shared documents, film highlights, and direct advisor access — all in one place.',
                  },
                ].map((item, i) => (
                  <li key={i}>
                    <div className="flex items-center gap-2.5 font-semibold text-white mb-2">
                      <Ic.CheckCircle className="text-gold-400 shrink-0" /> {item.t}
                    </div>
                    <p className="text-ink-400 text-sm leading-relaxed pl-7">{item.d}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-ink-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink-800 flex items-center justify-center text-gold-400" aria-hidden="true">
                  <Ic.Shield />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">Compliance-Grade Advisory</div>
                  <div className="text-ink-500 text-xs">NCAA &amp; NIL Compliant Guidance</div>
                </div>
              </div>
            </div>
          </AnimSect>
        </div>
      </div>
    </div>
  );
};

// ── FAQ ────────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: 'Who is this for?',
      a: 'Civic Sports Consulting works with three groups: current NCAA D1/D2 athletes navigating NIL and eligibility, elite high school recruits (and their parents) in the thick of the recruiting process, and middle school athletes whose families want to build the right foundation early. If you are serious about the next level, this is for you.',
    },
    {
      q: 'Are you a licensed sports agent?',
      a: 'No. Civic Sports Consulting is not a licensed sports agent and does not act as one. We provide expert consulting, strategic guidance, and compliance education. For agent representation, clients should work with a certified NBPA, NFL, or applicable sports agent. We are the architects — the agent is a separate relationship.',
    },
    {
      q: 'What exactly is the Foundation Audit?',
      a: 'The Foundation Audit ($350) is our entry-point service — a comprehensive deep-dive into academic eligibility, social media compliance, and recruitment readiness. You receive a documented report uploaded to your private dashboard with specific, actionable findings. It is the honest baseline every serious athlete needs before making any major recruiting move.',
    },
    {
      q: 'What does the client dashboard include?',
      a: 'Every client on an active engagement receives access to a secure private portal. Inside you will find your live strategic roadmap, shared highlight documents, session notes, resources, and direct communication with your advisor. Everything in one place — no chasing emails.',
    },
    {
      q: 'Do you provide tax or legal advice?',
      a: 'No. While we understand the legal landscape of sports deeply, we are not licensed attorneys or tax professionals. Our guidance is strategic and educational in nature. For tax matters related to NIL income, clients should consult a licensed CPA or tax advisor. For contract execution, a licensed attorney should review final agreements.',
    },
    {
      q: 'What happens after I submit the intake?',
      a: 'Once you schedule your assessment, you will pick a time, pay the $350 Foundation Audit fee, sign the consultant disclaimer, and complete the intake form — all in one streamlined flow. We review your submission and begin the audit process ahead of your first session.',
    },
  ];

  return (
    <div className="section-cream min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <AnimSect className="text-center mb-16">
          <div className="divider-gold mx-auto mb-5" aria-hidden="true" />
          <h1 className="font-display text-5xl font-semibold text-ink-900">Frequently Asked Questions</h1>
        </AnimSect>

        <div className="space-y-3" role="list">
          {faqs.map((f, i) => (
            <AnimSect key={i} delay={i * 60} className={`card overflow-hidden ${open === i ? 'border-gold-300' : ''}`} role="listitem">
              <button type="button"
                className="w-full flex items-center justify-between p-7 text-left"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                aria-controls={`faq-body-${i}`}
                id={`faq-btn-${i}`}
              >
                <span className="font-semibold text-ink-900 pr-8">{f.q}</span>
                <Ic.ChevronDown className={`shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180 text-gold-500' : 'text-ink-400'}`} />
              </button>
              <div
                id={`faq-body-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className={`faq-body ${open === i ? 'open' : ''}`}
              >
                <div className="px-7 pb-7 text-ink-500 leading-relaxed text-sm border-t border-cream-300 pt-4">
                  {f.a}
                </div>
              </div>
            </AnimSect>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── CONTACT ────────────────────────────────────────────────────────────────────
const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate submission — replace with real API call
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="section-cream min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <AnimSect className="text-center mb-16">
          <div className="divider-gold mx-auto mb-5" aria-hidden="true" />
          <h1 className="font-display text-5xl font-semibold text-ink-900">Get in Touch</h1>
          <p className="text-ink-500 text-lg mt-4 max-w-xl mx-auto">
            Ready to start? Have a question before committing? Reach out directly — every message is read personally.
          </p>
        </AnimSect>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact info */}
          <AnimSect>
            <div className="card p-8">
              <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">Contact Info</h2>
              <address className="not-italic space-y-5">
                {[
                  { icon: <Ic.Mail />, label: 'Email', val: 'contact@civicsports.com', href: 'mailto:contact@civicsports.com' },
                  { icon: <Ic.MapPin />, label: 'Location', val: 'Columbus, Ohio' },
                  { icon: <Ic.Clock />, label: 'Response Time', val: 'Within 48 hours of every submission' },
                ].map((c) => (
                  <div key={c.label} className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-600 shrink-0" aria-hidden="true">
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-medium text-ink-900 text-sm">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-ink-500 text-sm mt-0.5 hover:text-gold-600 transition-colors">
                          {c.val}
                        </a>
                      ) : (
                        <div className="text-ink-500 text-sm mt-0.5">{c.val}</div>
                      )}
                    </div>
                  </div>
                ))}
              </address>
            </div>
          </AnimSect>

          {/* Contact form */}
          <AnimSect delay={150} className="md:col-span-2">
            <div className="card p-8 md:p-10">
              {status === 'success' ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-sage-100 border border-sage-200 text-sage-600 flex items-center justify-center mx-auto mb-5" aria-hidden="true">
                    <Ic.CheckCircle className="w-8 h-8" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-ink-900 mb-3">Message Sent</h2>
                  <p className="text-ink-500">We will get back to you within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form" noValidate>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="intake-label">First Name</label>
                      <input
                        id="firstName"
                        name="firstName"
                        className="intake-input"
                        placeholder="Jane"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="intake-label">Last Name</label>
                      <input
                        id="lastName"
                        name="lastName"
                        className="intake-input"
                        placeholder="Smith"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="intake-label">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="intake-input"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="intake-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="intake-input resize-none"
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-ink w-full py-3.5 rounded-xl font-semibold flex justify-center items-center gap-2"
                  >
                    {status === 'sending' ? 'Sending...' : (<>Send Message <Ic.Send /></>)}
                  </button>
                </form>
              )}
            </div>
          </AnimSect>
        </div>
      </div>
    </div>
  );
};

// ── LOGIN ──────────────────────────────────────────────────────────────────────
const Login = () => {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email address.'); return; }
    setError('');
    login(email);
  };

  return (
    <div className="min-h-screen section-cream flex items-center justify-center pt-24 pb-20">
      <AnimSect className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-ink-900 shadow-xl mb-4" aria-hidden="true">
            <Ic.Logo />
          </div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">Client Portal</h1>
          <p className="text-ink-500 mt-2 text-sm">Access your private assessment dashboard.</p>
        </div>

        <div className="card p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="login-email" className="intake-label">Email Address</label>
              <div className="relative">
                <Ic.Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4" />
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="intake-input pl-10"
                  placeholder="family@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label htmlFor="login-password" className="intake-label mb-0">Password</label>
                <button type="button" className="text-xs text-gold-600 hover:text-gold-700 font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Ic.Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 w-4 h-4" />
                <input
                  id="login-password"
                  type="password"
                  required
                  className="intake-input pl-10"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button type="submit" className="btn-ink w-full py-3.5 rounded-xl font-semibold">
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-ink-500 mt-6">
          Not a member yet?{' '}
          <button type="button" onClick={() => navigate('intake')} className="text-gold-600 font-medium hover:underline">
            Start an intake
          </button>
        </p>
      </AnimSect>
    </div>
  );
};

// ── DASHBOARD SIDEBAR ITEM (hoisted to module scope to avoid re-create on render) ──
const SideItem = ({ icon, label, id, activeTab, onSelect }) => (
  <button type="button"
    onClick={() => onSelect(id)}
    className={`sidebar-item ${activeTab === id ? 'active' : ''}`}
    aria-current={activeTab === id ? 'page' : undefined}
  >
    {icon} {label}
  </button>
);

// ── DASHBOARD ──────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const { user, logout, navigate } = useApp();
  const [tab, setTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen section-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-ink-500 mb-4">Please log in to access your dashboard.</p>
          <button type="button" onClick={() => navigate('login')} className="btn-ink py-3 px-8 rounded-full font-semibold">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const progressPct = 65;
  const r = 44;
  const circ = r * 2 * Math.PI;
  const offset = circ - (progressPct / 100) * circ;

  return (
    <div className="min-h-screen section-cream flex flex-col md:flex-row" style={{ paddingTop: '72px' }}>
      {/* Desktop sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-cream-300 md:min-h-screen p-6 flex-col hidden md:flex" aria-label="Dashboard navigation">
        <div className="mb-8 px-2">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-widest mb-1">Client Portal</p>
          <h1 className="font-display text-xl font-semibold text-ink-900">{user.name}</h1>
          <p className="text-xs text-ink-400 mt-0.5">{user.sport} &middot; {user.athleteName}</p>
        </div>
        <nav className="space-y-1 flex-1" aria-label="Portal sections">
          <SideItem icon={<Ic.Dashboard />} label="Overview"    id="overview"     activeTab={tab} onSelect={setTab} />
          <SideItem icon={<Ic.Activity />}  label="Assessments" id="assessments"  activeTab={tab} onSelect={setTab} />
          <SideItem icon={<Ic.Target />}    label="Action Plan" id="action-plan"  activeTab={tab} onSelect={setTab} />
          <SideItem icon={<Ic.Document />}  label="Resources"   id="resources"    activeTab={tab} onSelect={setTab} />
        </nav>
        <div className="pt-5 border-t border-cream-300 mt-6">
          <button type="button" onClick={logout} className="sidebar-item text-ink-500">
            <Ic.Logout /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile tab bar */}
      <div className="md:hidden bg-white border-b border-cream-300 p-4 flex justify-between items-center sticky top-16 z-30">
        <div>
          <p className="text-xs text-ink-400">Client Portal</p>
          <p className="font-semibold text-ink-900 text-sm">{user.name}</p>
        </div>
        <label htmlFor="mobile-tab-select" className="sr-only">Portal section</label>
        <select
          id="mobile-tab-select"
          value={tab}
          onChange={(e) => setTab(e.target.value)}
          className="bg-cream-200 border-none text-sm font-medium rounded-lg px-3 py-2 outline-none text-ink-800"
        >
          <option value="overview">Overview</option>
          <option value="assessments">Assessments</option>
          <option value="action-plan">Action Plan</option>
          <option value="resources">Resources</option>
        </select>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 max-w-5xl" aria-label="Dashboard content">

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div className="space-y-8 animate-fade-up">
            <header>
              <h2 className="font-display text-4xl font-semibold text-ink-900">Welcome back, {user.athleteName}</h2>
              <p className="text-ink-500 mt-1">Member since {user.memberSince}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Progress ring */}
              <div className="card p-7 flex items-center gap-5 md:col-span-1">
                <div className="relative w-24 h-24 shrink-0" role="img" aria-label={`Recruitment roadmap ${progressPct}% complete`}>
                  <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                    <circle strokeWidth="7" cx="50" cy="50" r={r} fill="transparent" stroke="#e8e2d6" />
                    <circle
                      className="progress-ring"
                      strokeWidth="7"
                      strokeLinecap="round"
                      cx="50" cy="50" r={r}
                      fill="transparent"
                      stroke="#c48726"
                      strokeDasharray={circ}
                      strokeDashoffset={offset}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <span className="font-display text-xl font-semibold text-ink-900">{progressPct}%</span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-ink-900 text-sm">Recruitment Roadmap</div>
                  <div className="text-ink-500 text-xs mt-1 leading-relaxed">Next: Finalize target school list</div>
                  <button type="button" className="text-gold-600 text-xs font-semibold mt-2 flex items-center gap-1 hover:text-gold-700">
                    View Full <Ic.ChevronRight />
                  </button>
                </div>
              </div>

              {/* Phase card */}
              <div className="card p-7">
                <div className="w-9 h-9 rounded-lg bg-sage-50 border border-sage-200 text-sage-600 flex items-center justify-center mb-4" aria-hidden="true">
                  <Ic.Activity />
                </div>
                <p className="text-xs font-medium text-ink-400 uppercase tracking-wider">Current Phase</p>
                <p className="font-display text-2xl font-semibold text-ink-900 mt-1">{user.phase}</p>
                <p className="text-xs text-ink-400 mt-3 pt-3 border-t border-cream-300">Ends in 4 weeks</p>
              </div>

              {/* Next meeting */}
              <div className="card p-7">
                <div className="w-9 h-9 rounded-lg bg-gold-50 border border-gold-200 text-gold-600 flex items-center justify-center mb-4" aria-hidden="true">
                  <Ic.Calendar />
                </div>
                <p className="text-xs font-medium text-ink-400 uppercase tracking-wider">Next Meeting</p>
                <p className="font-display text-2xl font-semibold text-ink-900 mt-1">Oct 24</p>
                <p className="text-xs text-ink-400 flex items-center gap-1 mt-1"><Ic.Clock />4:00 PM EST</p>
                <button type="button" className="text-gold-600 text-xs font-medium hover:underline mt-3 pt-3 border-t border-cream-300 block text-left">
                  Reschedule
                </button>
              </div>
            </div>

            {/* Advisor + action */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-ink-900 rounded-2xl p-7 text-white relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20"
                  aria-hidden="true"
                  style={{ background: '#e0a835', transform: 'translate(30%,-30%)' }}
                />
                <p className="text-ink-400 text-xs font-medium uppercase tracking-wider mb-5">Your Lead Advisor</p>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-ink-800 border-2 border-gold-500 flex items-center justify-center text-gold-400 font-display text-lg font-semibold" aria-hidden="true">
                    CS
                  </div>
                  <div>
                    <div className="font-semibold text-white">Civic Sports Advisor</div>
                    <div className="text-gold-400 text-xs">Lead Consulting Strategist</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="button" className="flex-1 bg-white text-ink-900 py-2.5 rounded-xl text-xs font-semibold flex justify-center items-center gap-1.5 hover:bg-cream-100 transition-colors">
                    <Ic.Chat className="w-4 h-4" /> Message
                  </button>
                  <button type="button" className="flex-1 bg-ink-800 text-white py-2.5 rounded-xl text-xs font-semibold border border-ink-700 flex justify-center items-center gap-1.5 hover:bg-ink-700 transition-colors">
                    <Ic.Calendar className="w-4 h-4" /> Schedule
                  </button>
                </div>
              </div>

              <div className="card p-7 bg-ink-950 border-ink-800 relative overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
                  aria-hidden="true"
                  style={{ background: '#e0a835', transform: 'translate(30%,-30%)' }}
                />
                <p className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">Action Required</p>
                <p className="text-white font-semibold mb-5 text-base leading-snug">Review New Assessment Report</p>
                <button type="button"
                  onClick={() => setTab('assessments')}
                  className="btn-gold w-full py-2.5 rounded-xl text-sm font-semibold flex justify-center items-center gap-2"
                >
                  View Report <Ic.ArrowRight />
                </button>
              </div>
            </div>

            {/* Latest notes */}
            <div className="card overflow-hidden">
              <div className="px-7 py-5 border-b border-cream-200 bg-cream-100/50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-ink-900 font-semibold">
                  <Ic.Clipboard className="text-ink-400 w-4 h-4" aria-hidden="true" /> Latest Consultant Notes
                </div>
                <span className="text-xs text-ink-400 font-medium">Sept 28</span>
              </div>
              <div className="p-7">
                <p className="text-ink-600 leading-relaxed text-sm">
                  Marcus&rsquo;s Foundation Audit is complete. Academic eligibility is clean — no issues flagged. Social media compliance review identified two posts that should be archived before any official NIL engagement. Recruitment readiness score is strong for D1 mid-major programs. Next step: confirm the 12-month roadmap targets and begin the Recruitment Roadmap engagement to build the school outreach strategy.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ASSESSMENTS */}
        {tab === 'assessments' && (
          <div className="space-y-7 animate-fade-up">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="font-display text-4xl font-semibold text-ink-900">Assessments</h2>
                <p className="text-ink-500 mt-1">Objective baselines and performance tracking.</p>
              </div>
              <button type="button" className="btn-outline-ink text-xs py-2 px-4 rounded-lg flex items-center gap-1.5">
                <Ic.Download /> Export PDF
              </button>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-7">
                <h3 className="font-semibold text-ink-900 mb-6">Technical Evaluation (Q3)</h3>
                <div className="space-y-5">
                  {[
                    { label: 'Ball Handling / Control', score: 88 },
                    { label: 'Court Vision',            score: 92 },
                    { label: 'Off-Ball Movement',       score: 74 },
                    { label: 'Weak Hand Proficiency',   score: 62 },
                  ].map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-ink-700">{m.label}</span>
                        <span className="text-ink-400">{m.score}/100</span>
                      </div>
                      <div className="metric-bar-track" role="progressbar" aria-valuenow={m.score} aria-valuemin={0} aria-valuemax={100} aria-label={m.label}>
                        <div
                          className="metric-bar-fill"
                          style={{
                            width: `${m.score}%`,
                            background: m.score >= 80 ? '#4d7a66' : '#c48726',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-7">
                <h3 className="font-semibold text-ink-900 mb-6">Physical Metrics Tracker</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Vertical Jump',  val: '34 in',  change: '+2.5 in improvement', pos: true },
                    { label: 'Sprint (10m)',   val: '1.59s',  change: '-0.07s improvement',  pos: true },
                    { label: 'Max Wingspan',   val: "6'7\"",  change: 'Baseline',             pos: null },
                    { label: 'Agility T-Test', val: '9.2s',  change: '-0.3s improvement',   pos: true },
                  ].map((m, i) => (
                    <div key={i} className="flex justify-between items-center p-3.5 bg-cream-100 rounded-xl">
                      <span className="text-sm font-medium text-ink-700">{m.label}</span>
                      <div className="text-right">
                        <p className="text-sm font-bold text-ink-900">{m.val}</p>
                        <p className={`text-xs font-medium ${m.pos === true ? 'text-sage-600' : 'text-ink-400'}`}>{m.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ACTION PLAN */}
        {tab === 'action-plan' && (
          <div className="space-y-7 animate-fade-up">
            <header>
              <h2 className="font-display text-4xl font-semibold text-ink-900">Action Plan</h2>
              <p className="text-ink-500 mt-1">Strategic priorities for the current phase.</p>
            </header>
            <div className="card overflow-hidden divide-y divide-cream-200">
              {[
                { task: 'Archive flagged social media posts identified in Foundation Audit before first NIL engagement.', status: 'pending',   priority: 'High' },
                { task: 'Register for the November regional showcase — confirmed target exposure event.',                  status: 'pending',   priority: 'High' },
                { task: 'Review Foundation Audit report — sign off on eligibility status and compliance findings.',        status: 'completed', priority: 'High' },
                { task: 'Complete the 12-month school target preference questionnaire shared in your portal.',             status: 'pending',   priority: 'Medium' },
                { task: 'Upload updated highlight reel cut to dashboard shared folder by Oct 28.',                        status: 'pending',   priority: 'Medium' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 hover:bg-cream-100/50 transition-colors">
                  <div className={`mt-0.5 shrink-0 ${item.status === 'completed' ? 'text-sage-500' : 'text-ink-300'}`} aria-hidden="true">
                    <Ic.CheckCircle />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${item.status === 'completed' ? 'text-ink-400 line-through' : 'text-ink-800'}`}>
                      {item.task}
                    </p>
                    <div className="mt-2">
                      <span className={item.priority === 'High' ? 'tag-high' : item.priority === 'Medium' ? 'tag-medium' : 'tag-low'}>
                        {item.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESOURCES */}
        {tab === 'resources' && (
          <div className="space-y-7 animate-fade-up">
            <header>
              <h2 className="font-display text-4xl font-semibold text-ink-900">Resources</h2>
              <p className="text-ink-500 mt-1">Guides, templates, and reference materials.</p>
            </header>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Foundation Audit — Full Report',   type: 'PDF Document', size: '4.2 MB' },
                { title: 'NIL Compliance Guide 2025',        type: 'PDF Document', size: '3.1 MB' },
                { title: 'College Coach Email Templates',    type: 'Word Document', size: '1.1 MB' },
                { title: 'NCAA Eligibility Checklist',       type: 'PDF Document', size: '890 KB' },
                { title: 'Social Media Compliance Rules',    type: 'PDF Document', size: '1.6 MB' },
                { title: '12-Month Roadmap Template',        type: 'Spreadsheet',  size: '1.3 MB' },
              ].map((doc, i) => (
                <div key={i} className="card p-5 flex items-center justify-between group hover:border-gold-300 cursor-pointer card-hover">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cream-200 text-ink-500 flex items-center justify-center group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors" aria-hidden="true">
                      <Ic.Document />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{doc.title}</p>
                      <p className="text-xs text-ink-400 mt-0.5">{doc.type} &middot; {doc.size}</p>
                    </div>
                  </div>
                  <Ic.Download className="text-ink-300 group-hover:text-gold-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ── INTAKE ─────────────────────────────────────────────────────────────────────
const Intake = () => {
  const { navigate } = useApp();
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const totalSteps = 3;
  const stepLabels = ['Contact Info', 'Athlete Details', 'Goals & Challenges'];

  if (done) return (
    <div className="min-h-screen section-cream flex items-center justify-center pt-24 pb-20">
      <AnimSect className="max-w-md w-full mx-auto px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-sage-100 border border-sage-200 text-sage-600 flex items-center justify-center mx-auto mb-7" aria-hidden="true">
          <Ic.CheckCircle className="w-9 h-9" />
        </div>
        <h1 className="font-display text-4xl font-semibold text-ink-900 mb-4">You&rsquo;re In the Queue.</h1>
        <p className="text-ink-500 leading-relaxed mb-8">
          Your intake has been received. We personally review every submission — if we are a fit, you will hear from us within 48 hours to confirm your Foundation Audit session and next steps.
        </p>
        <button type="button" onClick={() => navigate('home')} className="btn-ink py-3 px-8 rounded-full font-semibold">
          Return Home
        </button>
      </AnimSect>
    </div>
  );

  return (
    <div className="min-h-screen section-cream pt-28 pb-24">
      <div className="max-w-2xl mx-auto px-6">
        <AnimSect className="text-center mb-10">
          <div className="divider-gold mx-auto mb-5" aria-hidden="true" />
          <h1 className="font-display text-4xl font-semibold text-ink-900">Athlete Assessment Intake</h1>
          <p className="text-ink-500 mt-3">
            Select your time, complete payment, and sign the consultant disclaimer — then fill this out so we come prepared.
          </p>
        </AnimSect>

        {/* Progress indicator */}
        <div className="mb-8" aria-label={`Step ${step} of ${totalSteps}: ${stepLabels[step - 1]}`}>
          <div className="flex justify-between text-xs font-semibold mb-2">
            {stepLabels.map((l, i) => (
              <span key={i} className={step > i ? 'text-gold-600' : step === i + 1 ? 'text-ink-700' : 'text-ink-300'}>
                {l}
              </span>
            ))}
          </div>
          <div className="h-1.5 bg-cream-300 rounded-full overflow-hidden" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={totalSteps}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%`, background: 'linear-gradient(90deg,#c48726,#e0a835)' }}
            />
          </div>
        </div>

        <div className="card p-8 md:p-10">
          {/* Step 1 */}
          {step === 1 && (
            <fieldset className="space-y-5 animate-fade-up border-none p-0 m-0">
              <legend className="font-semibold text-ink-900 mb-5 pb-4 border-b border-cream-300 w-full text-base">
                Parent / Guardian Information
              </legend>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="parentName" className="intake-label">Parent Name <span aria-hidden="true">*</span></label>
                  <input id="parentName" className="intake-input" placeholder="Jane Smith" required />
                </div>
                <div>
                  <label htmlFor="parentEmail" className="intake-label">Email Address <span aria-hidden="true">*</span></label>
                  <input id="parentEmail" type="email" className="intake-input" placeholder="jane@example.com" required />
                </div>
                <div>
                  <label htmlFor="parentPhone" className="intake-label">Phone Number</label>
                  <input id="parentPhone" type="tel" className="intake-input" placeholder="(555) 000-0000" />
                </div>
                <div>
                  <label htmlFor="contactPref" className="intake-label">Preferred Contact</label>
                  <select id="contactPref" className="intake-input">
                    <option>Email</option>
                    <option>Phone Call</option>
                    <option>Text Message</option>
                  </select>
                </div>
              </div>
            </fieldset>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <fieldset className="space-y-5 animate-fade-up border-none p-0 m-0">
              <legend className="font-semibold text-ink-900 mb-5 pb-4 border-b border-cream-300 w-full text-base">
                Athlete Details
              </legend>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="athleteName" className="intake-label">Athlete Name <span aria-hidden="true">*</span></label>
                  <input id="athleteName" className="intake-input" placeholder="Marcus Smith" required />
                </div>
                <div>
                  <label htmlFor="athleteAge" className="intake-label">Age / Grade <span aria-hidden="true">*</span></label>
                  <input id="athleteAge" className="intake-input" placeholder="16 / 11th Grade" required />
                </div>
                <div>
                  <label htmlFor="primarySport" className="intake-label">Primary Sport <span aria-hidden="true">*</span></label>
                  <select id="primarySport" className="intake-input" required>
                    <option value="">Select sport...</option>
                    {['Basketball', 'Football', 'Soccer', 'Baseball', 'Softball', 'Volleyball', 'Track & Field', 'Swimming', 'Tennis', 'Golf', 'Lacrosse', 'Wrestling', 'Other'].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="currentLevel" className="intake-label">Current Level</label>
                  <input id="currentLevel" className="intake-input" placeholder="e.g. Club, JV, Varsity, D1, D2" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="filmLink" className="intake-label">Highlights / Film Link (Optional)</label>
                  <input id="filmLink" type="url" className="intake-input" placeholder="Hudl, YouTube, etc." />
                </div>
              </div>
            </fieldset>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <fieldset className="space-y-5 animate-fade-up border-none p-0 m-0">
              <legend className="font-semibold text-ink-900 mb-5 pb-4 border-b border-cream-300 w-full text-base">
                Goals &amp; Challenges
              </legend>
              <div>
                <label htmlFor="primaryReason" className="intake-label">
                  Primary reason for seeking consulting right now? <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="primaryReason"
                  rows={4}
                  className="intake-input resize-none"
                  placeholder="Be as specific as possible — recruiting timeline, NIL opportunity, eligibility concern, transfer portal, etc."
                  required
                />
              </div>
              <div>
                <label htmlFor="topGoals" className="intake-label">Athlete&rsquo;s top 2 goals for the next 12 months?</label>
                <textarea
                  id="topGoals"
                  rows={3}
                  className="intake-input resize-none"
                  placeholder="e.g. Earn D1 offer, secure first NIL deal, navigate transfer portal..."
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gold-50 border border-gold-200 rounded-xl">
                <input type="checkbox" id="newsletter" className="w-4 h-4 accent-gold-600" />
                <label htmlFor="newsletter" className="text-sm text-ink-700 cursor-pointer">
                  Join the <span className="font-semibold text-gold-700">Inner Circle</span> — NIL &amp; eligibility updates, recruiting intel, and strategy drops. No spam, unsubscribe anytime.
                </label>
              </div>

              <div className="flex items-start gap-3 bg-cream-100 rounded-xl p-4 border border-cream-300">
                <Ic.Lock className="text-ink-400 shrink-0 w-4 h-4 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-ink-500 leading-relaxed">
                  Your information is strictly confidential. By submitting, you acknowledge that Civic Sports Consulting provides strategic consulting guidance and is not a licensed sports agent or tax professional. All advice is educational in nature.
                </p>
              </div>
            </fieldset>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 mt-6 border-t border-cream-200">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="btn-outline-ink py-2.5 px-6 rounded-xl font-medium text-sm">
                Back
              </button>
            ) : (
              <div />
            )}
            {step < totalSteps ? (
              <button type="button" onClick={() => setStep(step + 1)} className="btn-ink py-2.5 px-7 rounded-xl font-semibold text-sm flex items-center gap-2">
                Continue <Ic.ArrowRight />
              </button>
            ) : (
              <button type="button" onClick={() => setDone(true)} className="btn-gold py-2.5 px-7 rounded-xl font-semibold text-sm">
                Submit Intake
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── NOT FOUND (404) ────────────────────────────────────────────────────────────
const NotFound = () => {
  const { navigate } = useApp();
  return (
    <div className="min-h-screen section-cream flex items-center justify-center pt-24 pb-20">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="font-display text-8xl font-semibold text-gold-400 mb-4" aria-hidden="true">404</div>
        <h1 className="font-display text-3xl font-semibold text-ink-900 mb-4">Page Not Found</h1>
        <p className="text-ink-500 mb-8">The page you are looking for does not exist or has been moved.</p>
        <button type="button" onClick={() => navigate('home')} className="btn-ink py-3 px-8 rounded-full font-semibold">
          Return Home
        </button>
      </div>
    </div>
  );
};

// ── JSON-LD SCHEMA ─────────────────────────────────────────────────────────────
const JsonLd = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Civic Sports Consulting',
    description: 'Elite sports consulting for student-athletes and families. NIL strategy, recruitment roadmaps, and compliance-grade guidance.',
    url: 'https://civicsports.com',
    telephone: '',
    email: 'contact@civicsports.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Columbus',
      addressRegion: 'OH',
      addressCountry: 'US',
    },
    priceRange: '$350–$5000',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

// ── APP ROUTER ─────────────────────────────────────────────────────────────────
const PAGES_WITHOUT_FOOTER = ['dashboard', 'login', 'intake'];
const VALID_PAGES = ['home', 'services', 'about', 'faq', 'contact', 'login', 'dashboard', 'intake'];

const AppRouter = () => {
  const { page } = useApp();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const showFooter = !PAGES_WITHOUT_FOOTER.includes(page);
  const isValid = VALID_PAGES.includes(page);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {isValid ? (
          <>
            {page === 'home'      && <Home />}
            {page === 'services'  && <Services />}
            {page === 'about'     && <About />}
            {page === 'faq'       && <FAQ />}
            {page === 'contact'   && <Contact />}
            {page === 'login'     && <Login />}
            {page === 'dashboard' && <Dashboard />}
            {page === 'intake'    && <Intake />}
          </>
        ) : (
          <NotFound />
        )}
      </main>
      {showFooter && <Footer />}
    </>
  );
};

// ── ROOT ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <JsonLd />
      <AppRouter />
    </AppProvider>
  );
}
