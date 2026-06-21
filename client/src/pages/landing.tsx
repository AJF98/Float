import { useEffect, useState } from "react"
import FloatLogo from "@/components/FloatLogo"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  Clock,
  Heart,
  List,
  MessageCircleOff,
  Sparkles,
  ThumbsUp,
  Users2,
  Vote,
  X,
} from "lucide-react"

const painPoints = [
  {
    icon: MessageCircleOff,
    iconClass: "text-rose-400",
    bgClass: "bg-rose-400/10",
    text: "Scattered across three group chats and counting",
  },
  {
    icon: X,
    iconClass: "text-amber-400",
    bgClass: "bg-amber-400/10",
    text: "No one knows which hotel is actually booked",
  },
  {
    icon: Clock,
    iconClass: "text-rose-400",
    bgClass: "bg-rose-400/10",
    text: "Decisions take days that should take minutes",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "Build your wish list",
    detail:
      "Everyone adds ideas — a boutique hotel they found, a sunset dinner spot, a kayaking tour. No idea is too early. Float collects everything in one living list the whole group can see and react to.",
    icon: List,
  },
  {
    step: "02",
    title: "Float it as a proposal, vote as a group",
    detail:
      "When an idea's ready for a real decision, float it. The group votes — thumbs up, down, or pass. Results surface instantly so you skip the 'what does everyone think?' spiral and move straight to confirmed.",
    icon: ThumbsUp,
  },
  {
    step: "03",
    title: "Lock it in and sync your calendar",
    detail:
      "Confirmed items drop straight into a shared itinerary. Everyone sees one trusted schedule — no spreadsheet, no duplicated calendar events, no who-booked-what confusion.",
    icon: CalendarRange,
  },
]

const benefits = [
  {
    icon: Sparkles,
    title: "Everyone has a voice",
    body: "No one person has to carry the planning load. Ideas come from everywhere, votes are equal, and decisions feel shared — so the whole group feels ownership over the trip.",
  },
  {
    icon: CheckCircle2,
    title: "Clarity at every step",
    body: "You always know what's confirmed, what's still being decided, and who's responsible for what. No ambiguity. No surprise changes. One source of truth for the whole group.",
  },
  {
    icon: Heart,
    title: "More trip, less admin",
    body: "Float handles the coordination busywork so you can spend your mental energy on the things that actually matter — being excited about where you're going, not stressed about how to get there.",
  },
]

const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" }
const LABEL: React.CSSProperties = { fontFamily: "'DM Mono', monospace", color: '#FF6B2B', fontSize: '11px', letterSpacing: '0.2em' }
const DARK = '#0C0805'
const TANG = '#FF6B2B'
const CREAM = 'rgba(245,230,200,0.75)'
const WARM_BG = '#FDF6EE'

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Fraunces', serif", color: DARK }}>

      {/* NAV */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${isScrolled ? "shadow-sm" : ""}`}
        style={{ backgroundColor: DARK, borderBottom: '1px solid rgba(255,107,43,0.12)' }}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
            aria-label="Float home"
          >
            <FloatLogo height={34} variant="light" />
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-sm px-5 transition-colors border-white/20 bg-transparent text-white hover:bg-white/10"
              style={{ ...MONO, fontSize: '13px' }}
              onClick={() => (window.location.href = "/login")}
            >
              Log in
            </Button>
            <Button
              onClick={() => (window.location.href = "/register")}
              className="rounded-sm px-6"
              style={{ ...MONO, fontSize: '13px', background: TANG, color: DARK, boxShadow: '0 8px 20px -8px rgba(255,107,43,0.55)' }}
            >
              Get started
            </Button>
          </div>
        </div>
      </nav>

      <main>

        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden" style={{ backgroundColor: DARK }}>
          <img
            src="/landing/beach-group-1.jpg"
            alt=""
            role="presentation"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-40"
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(12,8,5,0.96) 0%, rgba(12,8,5,0.72) 55%, rgba(12,8,5,0.18) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,8,5,0.85) 0%, transparent 45%)' }} />

          <div className="pointer-events-none absolute right-[-220px] top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full" style={{ border: '1px solid rgba(255,107,43,0.08)' }} />
          <div className="pointer-events-none absolute right-[-100px] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full" style={{ border: '1px solid rgba(255,107,43,0.12)' }} />
          <div className="pointer-events-none absolute right-[40px] top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full" style={{ border: '1px solid rgba(255,107,43,0.18)' }} />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-28 lg:px-8 lg:py-36">
            <div style={{ maxWidth: '680px' }}>
              <p
                className="inline-flex items-center gap-2 rounded-sm px-3 py-1 text-xs uppercase tracking-widest"
                style={{ ...MONO, color: TANG, background: 'rgba(255,107,43,0.10)', border: '1px solid rgba(255,107,43,0.28)' }}
              >
                <Sparkles className="h-3 w-3" />
                Plan together. Arrive happy.
              </p>

              <h1
                className="mt-10 text-[64px] text-white sm:text-[80px] lg:text-[96px]"
                style={{ fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.0 }}
              >
                Group trips that{" "}
                <br className="hidden sm:block" />
                actually{" "}
                <span style={{ color: TANG }}>come together</span>
              </h1>

              <p
                className="mt-10 max-w-xl text-xl leading-relaxed lg:text-2xl"
                style={{ fontWeight: 300, color: CREAM }}
              >
                Float gives everyone in your crew one shared space to float ideas, vote on favorites, and lock down a
                real itinerary — no chasing responses, no lost messages, no last-minute chaos.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  onClick={() => (window.location.href = "/register")}
                  className="h-14 rounded-sm px-10 text-base font-semibold transition-transform hover:-translate-y-0.5"
                  style={{ ...MONO, letterSpacing: '0.02em', background: TANG, color: DARK, boxShadow: '0 20px 40px -12px rgba(255,107,43,0.45)' }}
                >
                  Plan your trip — it's free
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                  className="h-14 rounded-sm px-10 text-base text-white transition-colors hover:bg-white/10"
                  style={{ ...MONO, letterSpacing: '0.02em', borderColor: 'rgba(255,255,255,0.22)', background: 'transparent' }}
                >
                  See how it works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {(["A", "M", "J", "S", "R"] as const).map((letter, i) => (
                    <Avatar key={letter} className="h-9 w-9 border-2" style={{ borderColor: DARK }}>
                      <AvatarFallback
                        className={`text-xs font-semibold text-white ${["bg-orange-500", "bg-amber-500", "bg-orange-400", "bg-red-500", "bg-rose-500"][i]}`}
                      >
                        {letter}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="h-5 w-px" style={{ background: 'rgba(255,255,255,0.2)' }} />
                <p className="text-xs tracking-wide" style={{ ...MONO, color: 'rgba(245,230,200,0.55)' }}>
                  Joined by{" "}
                  <span style={{ color: 'rgba(245,230,200,0.9)', fontWeight: 500 }}>4,200+</span>{" "}
                  group travelers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PAIN POINT STRIP */}
        <section className="relative overflow-hidden py-20 lg:py-24" style={{ backgroundColor: DARK }}>
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,107,43,0.06), transparent 60%)' }} />
          <div className="relative mx-auto w-full max-w-6xl px-4 lg:px-8">
            <p className="text-xs uppercase tracking-[0.25em]" style={LABEL}>Sound familiar?</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Planning a group trip shouldn't feel like herding cats in a group chat
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ fontWeight: 300, color: CREAM }}>
              Seventeen open tabs. A 300-message thread nobody's reading. Half the group is annoyed, the other half is
              winging it. By the time you leave, the planning itself has drained the excitement.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {painPoints.map(({ icon: Icon, iconClass, bgClass, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 rounded-sm p-5"
                  style={{ background: 'rgba(255,107,43,0.05)', border: '1px solid rgba(255,107,43,0.14)' }}
                >
                  <div className={`mt-0.5 shrink-0 rounded-lg p-2 ${bgClass}`}>
                    <Icon className={`h-4 w-4 ${iconClass}`} />
                  </div>
                  <p className="text-sm leading-6" style={{ fontWeight: 300, color: CREAM }}>{text}</p>
                </div>
              ))}
            </div>

            <div className="mb-6 mt-10 h-px" style={{ background: 'rgba(255,107,43,0.18)' }} />
            <p className="text-xl font-semibold" style={{ color: TANG }}>Float was built for exactly this.</p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 lg:py-28" style={{ backgroundColor: WARM_BG }}>
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 lg:grid-cols-[1fr,0.85fr] lg:items-stretch lg:gap-16 lg:px-8">
            <div>
              <p className="uppercase tracking-[0.25em]" style={LABEL}>How it works</p>
              <h2 className="mt-4 text-3xl font-bold lg:text-4xl" style={{ color: DARK }}>
                From a half-baked idea to a confirmed itinerary in three steps
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7" style={{ fontWeight: 300, color: 'rgba(12,8,5,0.62)' }}>
                Built to keep group plans moving with clarity, speed, and fewer repetitive messages.
              </p>

              <ol className="relative mt-10 space-y-6 border-l-2 border-dashed pl-10" style={{ borderColor: 'rgba(255,107,43,0.28)' }}>
                {howItWorks.map(({ step, title, detail, icon: Icon }) => (
                  <li key={step} className="relative">
                    <div
                      className="absolute -left-[3.25rem] flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ ...MONO, background: TANG, boxShadow: '0 8px 20px -6px rgba(255,107,43,0.45)' }}
                    >
                      {step}
                    </div>
                    <div
                      className="rounded-sm p-5"
                      style={{ background: '#FFFFFF', border: '1px solid rgba(12,8,5,0.08)', boxShadow: '0 4px 16px -8px rgba(12,8,5,0.10)' }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" style={{ color: TANG }} />
                        <h3 className="text-lg font-semibold" style={{ color: DARK }}>{title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-7" style={{ fontWeight: 300, color: 'rgba(12,8,5,0.62)' }}>{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative hidden overflow-hidden rounded-sm lg:block" style={{ background: '#F5E6C8' }}>
              <img
                src="/landing/beach-group-2.jpg"
                alt=""
                role="presentation"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
              />
              <div className="absolute inset-y-0 left-0 w-1/3" style={{ background: 'linear-gradient(to right, rgba(253,246,238,0.5), transparent)' }} />
              <div
                className="absolute bottom-4 left-4 right-4 rounded-sm p-4"
                style={{ background: 'rgba(253,246,238,0.95)', backdropFilter: 'blur(8px)', boxShadow: '0 8px 24px -8px rgba(12,8,5,0.18)' }}
              >
                <p className="uppercase tracking-widest" style={{ ...MONO, color: TANG, fontSize: '10px' }}>From Float users</p>
                <p className="mt-1 text-sm font-medium" style={{ color: DARK }}>
                  "We used to spend an hour just agreeing on dinner. Now we vote and move on."
                </p>
                <p className="mt-1 text-xs" style={{ ...MONO, color: 'rgba(12,8,5,0.45)' }}>— Mia, group trip to Portugal</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE SHOWCASE */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: WARM_BG }}>
          <div className="mx-auto w-full max-w-6xl space-y-20 px-4 lg:space-y-28 lg:px-8">

            {/* Feature 1: Wish List */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-1.5 uppercase tracking-[0.25em]" style={LABEL}>
                  <List className="h-3 w-3" /> Wish List
                </p>
                <h3 className="mt-4 text-2xl font-bold lg:text-3xl" style={{ color: DARK }}>
                  One place for every idea, from any member
                </h3>
                <p className="mt-4 text-base leading-7" style={{ fontWeight: 300, color: 'rgba(12,8,5,0.62)' }}>
                  Your group drops links, suggestions, and notes into a shared wish list. Nothing gets lost in a chat
                  thread. Everything is visible, sortable, and ready to act on when the time comes.
                </p>
              </div>
              <div className="rounded-sm p-1" style={{ background: '#FFF', border: '1px solid rgba(12,8,5,0.08)', boxShadow: '0 8px 24px -8px rgba(12,8,5,0.10)' }}>
                <div className="rounded-sm bg-white p-5">
                  <p className="uppercase tracking-widest" style={{ ...MONO, color: TANG, fontSize: '10px' }}>Wish List · Maui Trip</p>
                  <div className="mt-4 space-y-2.5">
                    {[
                      { name: "Mama's Fish House", tag: "Dining", votes: 5, tagClass: "border-cyan-200 bg-cyan-50 text-cyan-700" },
                      { name: "Road to Hana Day Trip", tag: "Activity", votes: 4, tagClass: "border-violet-200 bg-violet-50 text-violet-700" },
                      { name: "Montage Kapalua Bay", tag: "Stay", votes: 3, tagClass: "border-sky-200 bg-sky-50 text-sky-700" },
                    ].map(({ name, tag, votes, tagClass }) => (
                      <div key={name} className="flex items-center justify-between gap-3 rounded-sm bg-white px-3 py-2.5" style={{ border: '1px solid rgba(12,8,5,0.07)' }}>
                        <div className="flex min-w-0 items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: TANG }} />
                          <span className="truncate text-sm font-medium" style={{ color: DARK }}>{name}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className={`rounded-sm border px-2 py-0.5 text-xs font-medium ${tagClass}`} style={MONO}>{tag}</span>
                          <span className="flex items-center gap-1 text-xs" style={{ ...MONO, color: 'rgba(12,8,5,0.45)' }}>
                            <ThumbsUp className="h-3 w-3" /> {votes}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Voting */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="lg:order-2">
                <p className="inline-flex items-center gap-1.5 uppercase tracking-[0.25em]" style={LABEL}>
                  <Vote className="h-3 w-3" /> Proposals &amp; Voting
                </p>
                <h3 className="mt-4 text-2xl font-bold lg:text-3xl" style={{ color: DARK }}>
                  Turn "thoughts?" into a decision in under a minute
                </h3>
                <p className="mt-4 text-base leading-7" style={{ fontWeight: 300, color: 'rgba(12,8,5,0.62)' }}>
                  Float any wish-list item as a formal proposal. Members vote in real time. When a quorum is reached,
                  the proposal resolves — no follow-up message, no tally, no ambiguity.
                </p>
              </div>
              <div className="rounded-sm p-1 lg:order-1" style={{ background: '#FFF', border: '1px solid rgba(12,8,5,0.08)', boxShadow: '0 8px 24px -8px rgba(12,8,5,0.10)' }}>
                <div className="rounded-sm bg-white p-5">
                  <p className="uppercase tracking-widest" style={{ ...MONO, color: TANG, fontSize: '10px' }}>Active Vote</p>
                  <p className="mt-1 text-base font-semibold" style={{ color: DARK }}>Friday sunset dinner</p>
                  <div className="mt-4 space-y-3">
                    {[
                      { name: "Mama's Fish House", pct: 75, leader: true },
                      { name: "Merriman's Maui", pct: 50, leader: false },
                      { name: "Lahaina Grill", pct: 25, leader: false },
                    ].map(({ name, pct, leader }) => (
                      <div
                        key={name}
                        className="rounded-sm border p-3"
                        style={leader
                          ? { borderColor: TANG, boxShadow: '0 0 0 2px rgba(255,107,43,0.15)' }
                          : { borderColor: 'rgba(12,8,5,0.08)' }}
                      >
                        <div className="flex justify-between text-sm">
                          <span className="font-medium" style={{ color: leader ? TANG : 'rgba(12,8,5,0.7)' }}>{name}</span>
                          <span className="font-semibold" style={{ ...MONO, color: leader ? TANG : 'rgba(12,8,5,0.4)' }}>{pct}%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: 'rgba(12,8,5,0.06)' }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: leader ? TANG : 'rgba(12,8,5,0.15)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Calendar */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-1.5 uppercase tracking-[0.25em]" style={LABEL}>
                  <CalendarRange className="h-3 w-3" /> Itinerary &amp; Calendar
                </p>
                <h3 className="mt-4 text-2xl font-bold lg:text-3xl" style={{ color: DARK }}>
                  A shared schedule that only shows what's confirmed
                </h3>
                <p className="mt-4 text-base leading-7" style={{ fontWeight: 300, color: 'rgba(12,8,5,0.62)' }}>
                  Confirmed items appear on a group itinerary everyone can trust. Sync it to your phone calendar. Each
                  member sees their days clearly. The chaos of "wait, is that still happening?" disappears.
                </p>
              </div>
              <div className="rounded-sm p-1" style={{ background: '#FFF', border: '1px solid rgba(12,8,5,0.08)', boxShadow: '0 8px 24px -8px rgba(12,8,5,0.10)' }}>
                <div className="rounded-sm bg-white p-5">
                  <p className="uppercase tracking-widest" style={{ ...MONO, color: TANG, fontSize: '10px' }}>Maui · July 12–14</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {[
                      {
                        day: "Fri 12",
                        items: [
                          { label: "Arrive HNL", cls: "bg-emerald-100 text-emerald-800" },
                          { label: "Beach Club", cls: "bg-cyan-100 text-cyan-800" },
                        ],
                      },
                      {
                        day: "Sat 13",
                        items: [
                          { label: "Road to Hana", cls: "bg-violet-100 text-violet-800" },
                          { label: "Mama's Fish", cls: "bg-orange-100 text-orange-800" },
                        ],
                      },
                      {
                        day: "Sun 14",
                        items: [
                          { label: "Snorkel Tour", cls: "bg-sky-100 text-sky-800" },
                          { label: "Depart 6pm", cls: "bg-stone-100 text-stone-600" },
                        ],
                      },
                    ].map(({ day, items }) => (
                      <div key={day} className="rounded-sm p-2" style={{ border: '1px solid rgba(12,8,5,0.07)' }}>
                        <p className="text-xs font-semibold" style={{ ...MONO, color: 'rgba(12,8,5,0.4)' }}>{day}</p>
                        <div className="mt-1.5 space-y-1">
                          {items.map(({ label, cls }) => (
                            <p key={label} className={`rounded-sm px-2 py-1 text-xs font-medium ${cls}`}>
                              {label}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: RSVP */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="lg:order-2">
                <p className="inline-flex items-center gap-1.5 uppercase tracking-[0.25em]" style={LABEL}>
                  <Users2 className="h-3 w-3" /> RSVP Tracking
                </p>
                <h3 className="mt-4 text-2xl font-bold lg:text-3xl" style={{ color: DARK }}>
                  Always know who's in — no more chasing replies
                </h3>
                <p className="mt-4 text-base leading-7" style={{ fontWeight: 300, color: 'rgba(12,8,5,0.62)' }}>
                  Members RSVP per activity. You see a live roster of who's confirmed, who's out, and who hasn't
                  responded. Plan group sizes, book the right table, and stop guessing.
                </p>
              </div>
              <div className="rounded-sm p-1 lg:order-1" style={{ background: '#FFF', border: '1px solid rgba(12,8,5,0.08)', boxShadow: '0 8px 24px -8px rgba(12,8,5,0.10)' }}>
                <div className="rounded-sm bg-white p-5">
                  <p className="uppercase tracking-widest" style={{ ...MONO, color: TANG, fontSize: '10px' }}>RSVP · Road to Hana</p>
                  <div className="mt-4 space-y-2">
                    {[
                      { initials: "AL", name: "Alec", status: "confirmed" as const, color: "bg-orange-500" },
                      { initials: "MJ", name: "Mia", status: "confirmed" as const, color: "bg-amber-500" },
                      { initials: "SR", name: "Sam", status: "confirmed" as const, color: "bg-orange-400" },
                      { initials: "JK", name: "Jordan", status: "pending" as const, color: "bg-stone-400" },
                      { initials: "TL", name: "Tyler", status: "declined" as const, color: "bg-stone-300" },
                    ].map(({ initials, name, status, color }) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 rounded-sm px-3 py-2"
                        style={{ border: '1px solid rgba(12,8,5,0.07)', background: '#FAFAF9' }}
                      >
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${color}`}>
                          {initials}
                        </div>
                        <span className="flex-1 text-sm font-medium" style={{ color: DARK }}>{name}</span>
                        {status === "confirmed" && (
                          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600" style={MONO}>
                            <CheckCircle2 className="h-3.5 w-3.5" /> Going
                          </span>
                        )}
                        {status === "pending" && (
                          <span className="text-xs font-medium text-amber-600" style={MONO}>Pending</span>
                        )}
                        {status === "declined" && (
                          <span className="flex items-center gap-1 text-xs font-medium text-rose-500" style={MONO}>
                            <X className="h-3.5 w-3.5" /> Can't make it
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* WHY FLOAT */}
        <section className="relative overflow-hidden py-20 lg:py-24" style={{ backgroundColor: DARK }}>
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(255,107,43,0.06), transparent 60%)' }} />
          <div className="relative mx-auto w-full max-w-6xl px-4 lg:px-8">
            <p className="uppercase tracking-[0.25em]" style={LABEL}>Why Float</p>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Planning should feel like part of the trip, not a job before it
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7" style={{ fontWeight: 300, color: CREAM }}>
              Float is designed around how friend groups actually work — messy, busy, opinionated, and worth the
              coordination.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {benefits.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-sm p-8"
                  style={{ background: 'rgba(255,107,43,0.04)', border: '1px solid rgba(255,107,43,0.12)' }}
                >
                  <div className="inline-flex rounded-sm p-3" style={{ background: 'rgba(255,107,43,0.12)' }}>
                    <Icon className="h-6 w-6" style={{ color: TANG }} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7" style={{ fontWeight: 300, color: CREAM }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden px-4 py-24 lg:px-8 lg:py-32" style={{ backgroundColor: TANG }}>
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.10), transparent 70%)' }} />
          <div className="relative mx-auto w-full max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.2em]" style={{ ...MONO, color: 'rgba(12,8,5,0.52)' }}>
              Your next adventure is waiting
            </p>
            <h2 className="mt-5 text-4xl font-bold lg:text-5xl" style={{ color: DARK, lineHeight: 1.05 }}>
              Stop planning in circles.
              <br />
              Start actually going places.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed" style={{ fontWeight: 300, color: 'rgba(12,8,5,0.65)' }}>
              Float turns group trip chaos into collective momentum. Free to start, no credit card required.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => (window.location.href = "/register")}
                className="h-14 rounded-sm px-10 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ ...MONO, background: DARK, letterSpacing: '0.02em', boxShadow: '0 16px 40px -12px rgba(12,8,5,0.35)' }}
              >
                Create your first trip
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/login")}
                className="h-14 rounded-sm px-10 text-base"
                style={{ ...MONO, borderColor: 'rgba(12,8,5,0.22)', color: DARK, background: 'transparent', letterSpacing: '0.02em' }}
              >
                Log in
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm" style={{ ...MONO, color: 'rgba(12,8,5,0.52)' }}>
              {["Free to start", "No credit card", "Your whole group gets access"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: 'rgba(12,8,5,0.38)' }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
