import { useState, useEffect } from 'react';
import { PRODI_CONFIG } from '../config/prodi.config';
import { Trash2, Plus, LogOut, Loader2, Key, Globe, Eye, FileText, Database, Check } from 'lucide-react';
import { getBrowserSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/client';
import {
  MONO_PRODUCTS,
  ACADEMIC_NEWS,
  ACADEMIC_EVENTS,
  PROGRAM_HIGHLIGHTS,
  ALUMNI_TESTIMONIALS,
  PARTNERS,
} from '@/lib/site-data';

export function AdminPanel() {
  const supabase = getBrowserSupabaseClient();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'news_events' | 'page_content'>('news_events');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Live DB states
  const [dbNews, setDbNews] = useState<any[]>([]);
  const [dbEvents, setDbEvents] = useState<any[]>([]);
  const [dbPartners, setDbPartners] = useState<any[]>([]);
  const [dbTestimonials, setDbTestimonials] = useState<any[]>([]);

  // Page Content States
  const [sambutanTitle, setSambutanTitle] = useState('');
  const [sambutanTitleEn, setSambutanTitleEn] = useState('');
  const [sambutanP1, setSambutanP1] = useState('');
  const [sambutanP1En, setSambutanP1En] = useState('');
  const [sambutanP2, setSambutanP2] = useState('');
  const [sambutanP2En, setSambutanP2En] = useState('');
  const [quoteText, setQuoteText] = useState('');
  const [quoteTextEn, setQuoteTextEn] = useState('');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // News insert form state
  const [newsTitle, setNewsTitle] = useState('');
  const [newsTitleEn, setNewsTitleEn] = useState('');
  const [newsCategory, setNewsCategory] = useState('BERITA UTAMA');
  const [newsCategoryEn, setNewsCategoryEn] = useState('MAIN NEWS');
  const [newsSnippet, setNewsSnippet] = useState('');
  const [newsSnippetEn, setNewsSnippetEn] = useState('');
  const [newsDate, setNewsDate] = useState('');
  const [newsImgSrc, setNewsImgSrc] = useState('/assets/portfolio-ecoprint.jpg');

  // Event insert form state
  const [eventDay, setEventDay] = useState('');
  const [eventMonth, setEventMonth] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventTitleEn, setEventTitleEn] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventLocationEn, setEventLocationEn] = useState('');

  // Fetch live lists
  const fetchDbData = async () => {
    if (!supabase) return;
    const { data: news } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    const { data: events } = await supabase.from('events').select('*').order('created_at', { ascending: true });
    const { data: partners } = await supabase.from('partners').select('*').order('created_at', { ascending: true });
    const { data: testimonials } = await supabase.from('testimonials').select('*').order('created_at', { ascending: true });
    const { data: content } = await supabase.from('site_content').select('*');

    if (news) setDbNews(news);
    if (events) setDbEvents(events);
    if (partners) setDbPartners(partners);
    if (testimonials) setDbTestimonials(testimonials);

    if (content) {
      content.forEach((item) => {
        if (item.key === 'sambutan_title') {
          setSambutanTitle(item.value);
          setSambutanTitleEn(item.value_en || '');
        }
        if (item.key === 'sambutan_p1') {
          setSambutanP1(item.value);
          setSambutanP1En(item.value_en || '');
        }
        if (item.key === 'sambutan_p2') {
          setSambutanP2(item.value);
          setSambutanP2En(item.value_en || '');
        }
        if (item.key === 'quote_text') {
          setQuoteText(item.value);
          setQuoteTextEn(item.value_en || '');
        }
      });
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchDbData();
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchDbData();
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setAuthLoading(true);
    setAuthError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    }
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  // CRUD news functions
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !session) return;

    const { error } = await supabase.from('news').insert({
      title: newsTitle,
      title_en: newsTitleEn,
      category: newsCategory,
      category_en: newsCategoryEn,
      snippet: newsSnippet,
      snippet_en: newsSnippetEn,
      date: newsDate || new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      img_src: newsImgSrc,
    });

    if (error) {
      showToast('Error adding news: ' + error.message, 'error');
    } else {
      showToast('News article added successfully!');
      setNewsTitle('');
      setNewsTitleEn('');
      setNewsSnippet('');
      setNewsSnippetEn('');
      setNewsDate('');
      fetchDbData();
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!supabase || !session) return;
    if (!confirm('Are you sure you want to delete this news item?')) return;

    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) {
      showToast('Error deleting news: ' + error.message, 'error');
    } else {
      showToast('News article deleted successfully!');
      fetchDbData();
    }
  };

  // CRUD events functions
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !session) return;

    const { error } = await supabase.from('events').insert({
      date_day: eventDay,
      date_month: eventMonth.toUpperCase(),
      title: eventTitle,
      title_en: eventTitleEn,
      location: eventLocation,
      location_en: eventLocationEn,
    });

    if (error) {
      showToast('Error adding event: ' + error.message, 'error');
    } else {
      showToast('Event added successfully!');
      setEventDay('');
      setEventMonth('');
      setEventTitle('');
      setEventTitleEn('');
      setEventLocation('');
      setEventLocationEn('');
      fetchDbData();
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!supabase || !session) return;
    if (!confirm('Are you sure you want to delete this event?')) return;

    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) {
      showToast('Error deleting event: ' + error.message, 'error');
    } else {
      showToast('Event deleted successfully!');
      fetchDbData();
    }
  };

  // Update Page Content
  const handleUpdateSiteContent = async (key: string, value: string, valueEn: string) => {
    if (!supabase || !session) return;
    const { error } = await supabase
      .from('site_content')
      .update({
        value,
        value_en: valueEn,
        updated_at: new Date().toISOString(),
      })
      .eq('key', key);

    if (error) {
      showToast('Error updating page content: ' + error.message, 'error');
    } else {
      showToast('Page content updated successfully!');
      setSaveSuccess(key);
      setTimeout(() => setSaveSuccess(null), 2500);
      fetchDbData();
    }
  };

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-mono-yellow" />
        <p className="tech-tag text-mono-black/45 mt-4 font-mono">SYNCHRONIZING PORTAL...</p>
      </div>
    );
  }

  // 2. Unconfigured State
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border-2 border-mono-black p-8 shadow-[6px_6px_0px_#000000] rounded-none">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6 text-mono-yellow" />
            <h1 className="font-serif text-2xl font-bold tracking-tight text-mono-black">Supabase Unconfigured</h1>
          </div>
          <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-6">
            Supabase is not configured yet. Please populate your local <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-mono-black font-mono">.env</code> file with the correct credentials:
          </p>
          <pre className="bg-mono-black text-white p-4 font-mono text-xs overflow-x-auto mb-6 select-all">
{`PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-string`}
          </pre>
          <div className="border-t border-dashed border-mono-black/10 pt-4 flex justify-between items-center">
            <span className="tech-tag text-mono-black/45">STATUS // CONFIG_MISSING</span>
            <a href="/" className="text-xs font-bold text-mono-black hover:text-mono-yellow underline">GO BACK TO HOME</a>
          </div>
        </div>
      </div>
    );
  }

  // 3. Login Screen (Unauthenticated)
  if (!session) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border-2 border-mono-black p-8 shadow-[8px_8px_0px_#000000] rounded-none">
          <div className="text-center mb-8">
            <span className="tech-tag text-mono-yellow bg-mono-black px-3 py-1 font-bold">ADMIN AUTHENTICATION</span>
            <h1 className="font-serif text-3xl font-bold mt-4 text-mono-black">{PRODI_CONFIG.acronym} Portal Manager</h1>
            <p className="text-xs text-mono-black/50 mt-1 font-mono">SECURE LOGIN REQUIRED // 2026</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block tech-tag text-mono-black/60 mb-2 font-bold">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5 animate-none"
                placeholder="admin@umbandung.ac.id"
              />
            </div>

            <div>
              <label className="block tech-tag text-mono-black/60 mb-2 font-bold">PASSWORD</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5"
                placeholder="••••••••"
              />
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 font-sans">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-4 border-2 border-mono-black bg-mono-black text-white hover:bg-mono-yellow hover:text-mono-black font-bold tracking-widest text-xs transition-colors shadow-[4px_4px_0px_#000000] active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000] flex items-center justify-center gap-2 cursor-pointer"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                'SIGN IN TO PANEL'
              )}
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-dashed border-mono-black/10 text-center">
            <a href="/" className="text-xs font-bold text-mono-black/40 hover:text-mono-yellow underline">
              Return to Website [◀]
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 4. Admin Dashboard (Authenticated)
  return (
    <main className="min-h-screen bg-neutral-50 p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="bg-white border-2 border-mono-black p-6 md:p-8 shadow-[6px_6px_0px_#000000] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="tech-tag text-mono-black/55 font-bold">PORTAL MANAGER ACTIVE</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-mono-black mt-2">
              {PRODI_CONFIG.degree} {PRODI_CONFIG.name.id} {PRODI_CONFIG.universityShort}
            </h1>
            <p className="tech-tag text-mono-yellow font-bold mt-1">Logged in as: {session.user?.email}</p>
          </div>

          <div className="flex gap-3 shrink-0">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border-2 border-mono-black text-mono-black hover:bg-mono-yellow/10 text-xs font-bold tracking-wider flex items-center gap-2 transition-colors no-underline bg-white"
            >
              <Eye size={14} />
              VIEW SITE
            </a>
            <button
              onClick={handleSignOut}
              className="px-5 py-3 border-2 border-mono-black bg-mono-black text-white hover:bg-red-600 hover:border-red-600 font-bold text-xs tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              SIGN OUT
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-2 border-mono-black mb-8 gap-2">
          <button
            onClick={() => setActiveTab('news_events')}
            className={`px-6 py-3 border-t-2 border-x-2 border-mono-black font-serif text-sm font-bold flex items-center gap-2 transition-all cursor-pointer relative top-[2px] ${
              activeTab === 'news_events'
                ? 'bg-white border-b-2 border-b-white z-10 shadow-none'
                : 'bg-neutral-100 border-b-2 border-b-mono-black/10 opacity-70 hover:opacity-100'
            }`}
          >
            <Database size={16} />
            NEWS & EVENTS
          </button>
          <button
            onClick={() => setActiveTab('page_content')}
            className={`px-6 py-3 border-t-2 border-x-2 border-mono-black font-serif text-sm font-bold flex items-center gap-2 transition-all cursor-pointer relative top-[2px] ${
              activeTab === 'page_content'
                ? 'bg-white border-b-2 border-b-white z-10 shadow-none'
                : 'bg-neutral-100 border-b-2 border-b-mono-black/10 opacity-70 hover:opacity-100'
            }`}
          >
            <FileText size={16} />
            PAGE NARRATIVE CONTENT
          </button>
        </div>

        {/* tab 1: news and events */}
        {activeTab === 'news_events' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT: Live Data Feed (7 columns) */}
            <div className="lg:col-span-7 space-y-12">
              {/* Live News list */}
              <section className="bg-white border-2 border-mono-black p-6 shadow-[6px_6px_0px_#000000]">
                <div className="border-b-2 border-mono-black pb-4 mb-6 flex justify-between items-center">
                  <h2 className="font-serif text-xl font-bold">News & Announcements ({dbNews.length})</h2>
                  <span className="tech-tag text-white bg-mono-black px-2 py-0.5">DB // LIVE</span>
                </div>

                {dbNews.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-mono-black/15 text-neutral-400 text-sm">
                    No live news items in database. Seed data or add a new post.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dbNews.map((news) => (
                      <div
                        key={news.id}
                        className="p-4 border border-mono-black/10 bg-neutral-50 flex justify-between items-start gap-4 hover:border-mono-yellow transition-colors"
                      >
                        <div className="flex gap-4">
                          <img
                            src={news.img_src}
                            alt=""
                            className="w-16 h-12 object-cover bg-neutral-200 border border-mono-black/10"
                          />
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="tech-tag bg-neutral-200 text-mono-black px-1.5 py-0.5">
                                {news.category}
                              </span>
                              <span className="tech-tag text-mono-black/40 text-[10px]">{news.date}</span>
                            </div>
                            <h3 className="font-serif font-bold text-sm text-mono-black">{news.title}</h3>
                            {news.title_en && (
                              <p className="text-[11px] text-neutral-500 italic mt-0.5 flex items-center gap-1">
                                <Globe size={10} /> {news.title_en}
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteNews(news.id)}
                          className="p-2 border border-mono-black/10 hover:border-red-600 hover:text-red-600 bg-white transition-colors cursor-pointer"
                          aria-label="Delete news"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Live Events list */}
              <section className="bg-white border-2 border-mono-black p-6 shadow-[6px_6px_0px_#000000]">
                <div className="border-b-2 border-mono-black pb-4 mb-6 flex justify-between items-center">
                  <h2 className="font-serif text-xl font-bold">Upcoming Events ({dbEvents.length})</h2>
                  <span className="tech-tag text-white bg-mono-black px-2 py-0.5">DB // LIVE</span>
                </div>

                {dbEvents.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-mono-black/15 text-neutral-400 text-sm">
                    No live events in database. Seed data or add a new event.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {dbEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 border border-mono-black/10 bg-neutral-50 flex justify-between items-center gap-4 hover:border-mono-yellow transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center justify-center bg-mono-black text-white w-12 h-12 shrink-0 border-b-2 border-mono-yellow text-center">
                            <span className="font-serif text-lg font-bold leading-none">{event.date_day}</span>
                            <span className="tech-tag text-[8px] text-white/60 mt-0.5">{event.date_month}</span>
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-sm text-mono-black">{event.title}</h3>
                            <p className="tech-tag text-mono-black/50 text-[10px] mt-0.5">{event.location}</p>
                            {event.title_en && (
                              <p className="text-[11px] text-neutral-500 italic mt-0.5 flex items-center gap-1">
                                <Globe size={10} /> {event.title_en}
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-2 border border-mono-black/10 hover:border-red-600 hover:text-red-600 bg-white transition-colors cursor-pointer"
                          aria-label="Delete event"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* RIGHT: Add Content Forms (5 columns) */}
            <div className="lg:col-span-5 space-y-12">
              {/* add news form */}
              <section className="bg-white border-2 border-mono-black p-6 shadow-[6px_6px_0px_#000000]">
                <div className="border-b-2 border-mono-black pb-3 mb-6">
                  <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                    <Plus size={18} className="text-mono-yellow" />
                    Add News Item
                  </h2>
                </div>

                <form onSubmit={handleAddNews} className="space-y-4">
                  <div>
                    <label className="block tech-tag text-mono-black/60 mb-1 font-bold">TITLE (ID)</label>
                    <input
                      type="text"
                      required
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      placeholder="Pelatihan Teknik Pewarna Alami..."
                      className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block tech-tag text-mono-black/60 mb-1 font-bold">TITLE (EN)</label>
                    <input
                      type="text"
                      required
                      value={newsTitleEn}
                      onChange={(e) => setNewsTitleEn(e.target.value)}
                      placeholder="Natural Dyeing Techniques Training..."
                      className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block tech-tag text-mono-black/60 mb-1 font-bold">CATEGORY (ID)</label>
                      <select
                        value={newsCategory}
                        onChange={(e) => setNewsCategory(e.target.value)}
                        className="w-full border-2 border-mono-black p-2 font-mono text-[10px] focus:outline-none"
                      >
                        <option value="PENGABDIAN MASYARAKAT">PENGABDIAN MASYARAKAT</option>
                        <option value="PRESTASI MAHASISWA">PRESTASI MAHASISWA</option>
                        <option value="KOLABORASI RISET">KOLABORASI RISET</option>
                        <option value="BERITA UTAMA">BERITA UTAMA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block tech-tag text-mono-black/60 mb-1 font-bold">CATEGORY (EN)</label>
                      <select
                        value={newsCategoryEn}
                        onChange={(e) => setNewsCategoryEn(e.target.value)}
                        className="w-full border-2 border-mono-black p-2 font-mono text-[10px] focus:outline-none"
                      >
                        <option value="COMMUNITY SERVICE">COMMUNITY SERVICE</option>
                        <option value="STUDENT ACHIEVEMENT">STUDENT ACHIEVEMENT</option>
                        <option value="RESEARCH COLLABORATION">RESEARCH COLLABORATION</option>
                        <option value="MAIN NEWS">MAIN NEWS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block tech-tag text-mono-black/60 mb-1 font-bold">SNIPPET / DESCRIPTION (ID)</label>
                    <textarea
                      required
                      rows={2}
                      value={newsSnippet}
                      onChange={(e) => setNewsSnippet(e.target.value)}
                      placeholder="Deskripsi singkat berita..."
                      className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block tech-tag text-mono-black/60 mb-1 font-bold">SNIPPET / DESCRIPTION (EN)</label>
                    <textarea
                      required
                      rows={2}
                      value={newsSnippetEn}
                      onChange={(e) => setNewsSnippetEn(e.target.value)}
                      placeholder="Short news snippet in English..."
                      className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block tech-tag text-mono-black/60 mb-1 font-bold">DATE LABEL</label>
                      <input
                        type="text"
                        value={newsDate}
                        onChange={(e) => setNewsDate(e.target.value)}
                        placeholder="e.g. 02 JUN 2026"
                        className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block tech-tag text-mono-black/60 mb-1 font-bold">IMAGE PRESET</label>
                      <select
                        value={newsImgSrc}
                        onChange={(e) => setNewsImgSrc(e.target.value)}
                        className="w-full border-2 border-mono-black p-2 font-mono text-[10px] focus:outline-none"
                      >
                        <option value="/assets/portfolio-ecoprint.jpg">Ecoprint / Natural Dye</option>
                        <option value="/assets/portfolio-woven-bag.jpg">Woven Bag / Weaving</option>
                        <option value="/assets/philosophy-lab-editorial.jpg">Editorial Fiber Lab</option>
                        <option value="/assets/portfolio-ready-to-wear.jpg">Ready-To-Wear Shibori</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 border-2 border-mono-black bg-mono-black text-white hover:bg-mono-yellow hover:text-mono-black font-bold tracking-widest text-[10px] transition-colors shadow-[3px_3px_0px_#000000] active:translate-y-0.5 cursor-pointer"
                  >
                    SAVE NEWS POST
                  </button>
                </form>
              </section>

              {/* add event form */}
              <section className="bg-white border-2 border-mono-black p-6 shadow-[6px_6px_0px_#000000]">
                <div className="border-b-2 border-mono-black pb-3 mb-6">
                  <h2 className="font-serif text-xl font-bold flex items-center gap-2">
                    <Plus size={18} className="text-mono-yellow" />
                    Add Calendar Event
                  </h2>
                </div>

                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block tech-tag text-mono-black/60 mb-1 font-bold">DAY DIGIT</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 18"
                        value={eventDay}
                        onChange={(e) => setEventDay(e.target.value)}
                        className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block tech-tag text-mono-black/60 mb-1 font-bold">MONTH (3 CHAR)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. JUN"
                        value={eventMonth}
                        onChange={(e) => setEventMonth(e.target.value)}
                        className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block tech-tag text-mono-black/60 mb-1 font-bold">EVENT TITLE (ID)</label>
                    <input
                      type="text"
                      required
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder={`Workshop ${PRODI_CONFIG.name.id}...`}
                      className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block tech-tag text-mono-black/60 mb-1 font-bold">EVENT TITLE (EN)</label>
                    <input
                      type="text"
                      required
                      value={eventTitleEn}
                      onChange={(e) => setEventTitleEn(e.target.value)}
                      placeholder="Textile Craft Workshop..."
                      className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block tech-tag text-mono-black/60 mb-1 font-bold">LOCATION (ID)</label>
                    <input
                      type="text"
                      required
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder={`STUDIO UTAMA, ${PRODI_CONFIG.universityShort}`}
                      className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block tech-tag text-mono-black/60 mb-1 font-bold">LOCATION (EN)</label>
                    <input
                      type="text"
                      required
                      value={eventLocationEn}
                      onChange={(e) => setEventLocationEn(e.target.value)}
                      placeholder="MAIN CRAFT STUDIO, UMB"
                      className="w-full border-2 border-mono-black p-2 font-sans text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 border-2 border-mono-black bg-mono-black text-white hover:bg-mono-yellow hover:text-mono-black font-bold tracking-widest text-[10px] transition-colors shadow-[3px_3px_0px_#000000] active:translate-y-0.5 cursor-pointer"
                  >
                    SAVE EVENT
                  </button>
                </form>
              </section>
            </div>
          </div>
        )}

        {/* tab 2: page content settings */}
        {activeTab === 'page_content' && (
          <div className="space-y-8">
            {/* Editor 1: welcome head title */}
            <section className="bg-white border-2 border-mono-black p-6 md:p-8 shadow-[6px_6px_0px_#000000]">
              <div className="flex justify-between items-center border-b-2 border-mono-black pb-3 mb-6">
                <h3 className="font-serif text-lg font-bold">Sambutan Kaprodi - Section Title</h3>
                {saveSuccess === 'sambutan_title' && (
                  <span className="tech-tag text-green-700 bg-green-50 px-2 py-0.5 flex items-center gap-1 font-bold">
                    <Check size={12} /> SAVED SUCCESSFULLY
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block tech-tag text-mono-black/60 mb-2 font-bold">TITLE IN INDONESIAN (ID)</label>
                  <input
                    type="text"
                    value={sambutanTitle}
                    onChange={(e) => setSambutanTitle(e.target.value)}
                    className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5"
                  />
                </div>
                <div>
                  <label className="block tech-tag text-mono-black/60 mb-2 font-bold">TITLE IN ENGLISH (EN)</label>
                  <input
                    type="text"
                    value={sambutanTitleEn}
                    onChange={(e) => setSambutanTitleEn(e.target.value)}
                    className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleUpdateSiteContent('sambutan_title', sambutanTitle, sambutanTitleEn)}
                  className="px-6 py-3 border-2 border-mono-black bg-mono-black text-white hover:bg-mono-yellow hover:text-mono-black font-bold text-xs tracking-wider transition-colors cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-y-0.5"
                >
                  SAVE TITLE
                </button>
              </div>
            </section>

            {/* Editor 2: welcome head paragraph 1 */}
            <section className="bg-white border-2 border-mono-black p-6 md:p-8 shadow-[6px_6px_0px_#000000]">
              <div className="flex justify-between items-center border-b-2 border-mono-black pb-3 mb-6">
                <h3 className="font-serif text-lg font-bold">Sambutan Kaprodi - Paragraph 1</h3>
                {saveSuccess === 'sambutan_p1' && (
                  <span className="tech-tag text-green-700 bg-green-50 px-2 py-0.5 flex items-center gap-1 font-bold">
                    <Check size={12} /> SAVED SUCCESSFULLY
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block tech-tag text-mono-black/60 mb-2 font-bold">PARAGRAPH 1 (ID)</label>
                  <textarea
                    rows={4}
                    value={sambutanP1}
                    onChange={(e) => setSambutanP1(e.target.value)}
                    className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5 resize-y"
                  />
                </div>
                <div>
                  <label className="block tech-tag text-mono-black/60 mb-2 font-bold">PARAGRAPH 1 (EN)</label>
                  <textarea
                    rows={4}
                    value={sambutanP1En}
                    onChange={(e) => setSambutanP1En(e.target.value)}
                    className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5 resize-y"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleUpdateSiteContent('sambutan_p1', sambutanP1, sambutanP1En)}
                  className="px-6 py-3 border-2 border-mono-black bg-mono-black text-white hover:bg-mono-yellow hover:text-mono-black font-bold text-xs tracking-wider transition-colors cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-y-0.5"
                >
                  SAVE PARAGRAPH 1
                </button>
              </div>
            </section>

            {/* Editor 3: welcome head paragraph 2 */}
            <section className="bg-white border-2 border-mono-black p-6 md:p-8 shadow-[6px_6px_0px_#000000]">
              <div className="flex justify-between items-center border-b-2 border-mono-black pb-3 mb-6">
                <h3 className="font-serif text-lg font-bold">Sambutan Kaprodi - Paragraph 2</h3>
                {saveSuccess === 'sambutan_p2' && (
                  <span className="tech-tag text-green-700 bg-green-50 px-2 py-0.5 flex items-center gap-1 font-bold">
                    <Check size={12} /> SAVED SUCCESSFULLY
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block tech-tag text-mono-black/60 mb-2 font-bold">PARAGRAPH 2 (ID)</label>
                  <textarea
                    rows={4}
                    value={sambutanP2}
                    onChange={(e) => setSambutanP2(e.target.value)}
                    className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5 resize-y"
                  />
                </div>
                <div>
                  <label className="block tech-tag text-mono-black/60 mb-2 font-bold">PARAGRAPH 2 (EN)</label>
                  <textarea
                    rows={4}
                    value={sambutanP2En}
                    onChange={(e) => setSambutanP2En(e.target.value)}
                    className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5 resize-y"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleUpdateSiteContent('sambutan_p2', sambutanP2, sambutanP2En)}
                  className="px-6 py-3 border-2 border-mono-black bg-mono-black text-white hover:bg-mono-yellow hover:text-mono-black font-bold text-xs tracking-wider transition-colors cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-y-0.5"
                >
                  SAVE PARAGRAPH 2
                </button>
              </div>
            </section>

            {/* Editor 4: editorial quote text */}
            <section className="bg-white border-2 border-mono-black p-6 md:p-8 shadow-[6px_6px_0px_#000000]">
              <div className="flex justify-between items-center border-b-2 border-mono-black pb-3 mb-6">
                <h3 className="font-serif text-lg font-bold">Philosophy Lab Editorial Quote</h3>
                {saveSuccess === 'quote_text' && (
                  <span className="tech-tag text-green-700 bg-green-50 px-2 py-0.5 flex items-center gap-1 font-bold">
                    <Check size={12} /> SAVED SUCCESSFULLY
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block tech-tag text-mono-black/60 mb-2 font-bold">PHILOSOPHY QUOTE (ID)</label>
                  <textarea
                    rows={3}
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5 resize-y"
                  />
                </div>
                <div>
                  <label className="block tech-tag text-mono-black/60 mb-2 font-bold">PHILOSOPHY QUOTE (EN)</label>
                  <textarea
                    rows={3}
                    value={quoteTextEn}
                    onChange={(e) => setQuoteTextEn(e.target.value)}
                    className="w-full border-2 border-mono-black p-3 font-sans text-sm focus:outline-none focus:bg-mono-yellow/5 resize-y"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleUpdateSiteContent('quote_text', quoteText, quoteTextEn)}
                  className="px-6 py-3 border-2 border-mono-black bg-mono-black text-white hover:bg-mono-yellow hover:text-mono-black font-bold text-xs tracking-wider transition-colors cursor-pointer shadow-[3px_3px_0px_#000000] active:translate-y-0.5"
                >
                  SAVE QUOTE
                </button>
              </div>
            </section>
          </div>
        )}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 border-2 shadow-[4px_4px_0px_#000000] font-sans font-bold text-xs tracking-wider transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-mono-yellow text-mono-black border-mono-yellow' 
            : 'bg-red-500 text-white border-red-500'
        }`}>
          {toast.type === 'success' ? '✓' : '✕'} {toast.message.toUpperCase()}
        </div>
      )}
      </div>
    </main>
  );
}
