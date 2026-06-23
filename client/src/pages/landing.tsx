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
    text: "One person carries the entire planning load while everyone else waits",
  },
  {
    icon: X,
    iconClass: "text-amber-400",
    bgClass: "bg-amber-400/10",
    text: "Nobody knows who signed up for what until the day of",
  },
  {
    icon: Clock,
    iconClass: "text-rose-400",
    bgClass: "bg-rose-400/10",
    text: "Subgroups form on the fly with no way to see who's doing what",
  },
]

const howItWorks = [
  {
    step: "01",
    title: "Propose anything to the group",
    detail:
      "Anyone can float a flight option, a hotel they found, a dinner spot, a day trip. It goes straight to the group — no 300-message thread required. Everyone sees every idea the moment it's posted.",
    icon: List,
  },
  {
    step: "02",
    title: "Opt in or pass — no pressure",
    detail:
      "Members see every floated idea and decide what they're joining. Say yes, maybe, or skip it entirely. Subgroups form naturally around shared interests, without anyone having to negotiate.",
    icon: ThumbsUp,
  },
  {
    step: "03",
    title: "Everyone builds their own itinerary",
    detail:
      "Confirmed plans drop into each person's personal schedule inside the shared trip. Everyone sees exactly what they're doing — and what the rest of the group has planned.",
    icon: CalendarRange,
  },
]

const benefits = [
  {
    icon: Sparkles,
    title: "Your itinerary, your call",
    body: "No one has to do what everyone else is doing. Float lets each person opt into what excites them and skip what doesn't — without the awkward group negotiation.",
  },
  {
    icon: CheckCircle2,
    title: "Everyone plans, no one burns out",
    body: "The organizer doesn't have to come up with every idea for every person. When the whole group can float ideas, planning becomes part of the adventure — not a job before it.",
  },
  {
    icon: Heart,
    title: "Always know where your group is headed",
    body: "See what everyone has planned, what's still up for grabs, and who's doing what on any given day. No surprises, no 'wait, I thought we were all doing that?'",
  },
]

const MONO: React.CSSProperties = { fontFamily: "'DM Mono', monospace" }
const LABEL: React.CSSProperties = { fontFamily: "'DM Mono', monospace", color: '#0D9488', fontSize: '11px', letterSpacing: '0.2em' }
const DARK = '#0D3D39'
const TANG = '#0D9488'
const MUTED = 'rgba(13,61,57,0.65)'
const LIGHT = '#F0FDFA'
const ALT = '#F8FFFE'

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
        style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid rgba(13,148,136,0.15)' }}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
            aria-label="Float home"
          >
            <FloatLogo height={34} variant="dark" />
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-sm px-5 transition-colors border-teal-200 bg-transparent text-teal-700 hover:bg-teal-50"
              style={{ ...MONO, fontSize: '13px' }}
              onClick={() => (window.location.href = "/login")}
            >
              Log in
            </Button>
            <Button
              onClick={() => (window.location.href = "/register")}
              className="rounded-sm px-6"
              style={{ ...MONO, fontSize: '13px', background: TANG, color: '#FFFFFF', boxShadow: '0 8px 20px -8px rgba(13,148,136,0.45)' }}
            >
              Get started
            </Button>
          </div>
        </div>
      </nav>

      <main>

        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #EEF9F7 0%, #E0F7F4 100%)' }}>
          <img
            src="/landing/hf_20260617_003904_880d2e74-b221-46bc-99b2-05abaeffa11d.png"
            alt=""
            role="presentation"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%] opacity-40"
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(238,249,247,0.96) 0%, rgba(238,249,247,0.72) 55%, rgba(238,249,247,0.18) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(238,249,247,0.85) 0%, transparent 45%)' }} />

          <div className="pointer-events-none absolute right-[-220px] top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full" style={{ border: '1px solid rgba(13,148,136,0.08)' }} />
          <div className="pointer-events-none absolute right-[-100px] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full" style={{ border: '1px solid rgba(13,148,136,0.12)' }} />
          <div className="pointer-events-none absolute right-[40px] top-1/2 h-[320px] w-[320px] -translate-y-1/2 rounded-full" style={{ border: '1px solid rgba(13,148,136,0.18)' }} />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-28 lg:px-8 lg:py-36">
            <div style={{ maxWidth: '680px' }}>
              <p
                className="inline-flex items-center gap-2 rounded-sm px-3 py-1 text-xs uppercase tracking-widest"
                style={{ ...MONO, color: TANG, background: 'rgba(13,148,136,0.10)', border: '1px solid rgba(13,148,136,0.28)' }}
              >
                <Sparkles className="h-3 w-3" />
                Trip planning, finally relaxed.
              </p>

              <h1
                className="mt-10 text-[64px] sm:text-[80px] lg:text-[96px]"
                style={{ fontWeight: 900, letterSpacing: '-0.025em', lineHeight: 1.0, color: DARK }}
              >
                Twelve people.
                <br />
                One trip.
                <br />
                <span style={{ color: TANG }}>Everyone's itinerary.</span>
              </h1>

              <p
                className="mt-10 max-w-xl text-xl leading-relaxed lg:text-2xl"
                style={{ fontWeight: 300, color: MUTED }}
              >
                Float lets every member of your group propose ideas, see who's in, and build their own schedule — so
                no one person has to plan the whole trip for everyone else.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  onClick={() => (window.location.href = "/register")}
                  className="h-14 rounded-sm px-10 text-base font-semibold transition-transform hover:-translate-y-0.5"
                  style={{ ...MONO, letterSpacing: '0.02em', background: TANG, color: '#FFFFFF', boxShadow: '0 20px 40px -12px rgba(13,148,136,0.35)' }}
                >
                  Start floating — it's free
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                  className="h-14 rounded-sm px-10 text-base transition-colors hover:bg-teal-50"
                  style={{ ...MONO, letterSpacing: '0.02em', borderColor: 'rgba(13,148,136,0.40)', background: 'transparent', color: DARK }}
                >
                  See how it works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {(["A", "M", "J", "S", "R"] as const).map((letter, i) => (
                    <Avatar key={letter} className="h-9 w-9 border-2" style={{ borderColor: '#FFFFFF' }}>
                      <AvatarFallback
                        className={`text-xs font-semibold text-white ${["bg-teal-500", "bg-cyan-500", "bg-teal-400", "bg-emerald-600", "bg-blue-500"][i]}`}
                      >
                        {letter}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="h-5 w-px" style={{ background: 'rgba(13,148,136,0.25)' }} />
                <p className="text-xs tracking-wide" style={{ ...MONO, color: MUTED }}>
                  Joined by{" "}
                  <span style={{ color: DARK, fontWeight: 500 }}>4,200+</span>{" "}
                  group travelers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PAIN POINT STRIP */}
        <section className="relative overflow-hidden py-20 lg:py-24" style={{ backgroundColor: '#E6FAF7' }}>
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(13,148,136,0.10), transparent 60%)' }} />
          <div className="relative mx-auto w-full max-w-6xl px-4 lg:px-8">
            <p className="text-xs uppercase tracking-[0.25em]" style={LABEL}>Sound familiar?</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight lg:text-4xl" style={{ color: DARK }}>
              One person plans everything. The rest of the group just shows up.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ fontWeight: 300, color: MUTED }}>
              You've got twelve people with twelve different ideas of a perfect day. Someone wants temples, someone
              wants beach. You're the only one holding the full picture — coordinating over group chats, chasing
              responses, making calls for people who never asked you to. It shouldn't be this hard.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {painPoints.map(({ icon: Icon, iconClass, bgClass, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 rounded-sm p-5"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(13,148,136,0.18)' }}
                >
                  <div className={`mt-0.5 shrink-0 rounded-lg p-2 ${bgClass}`}>
                    <Icon className={`h-4 w-4 ${iconClass}`} />
                  </div>
                  <p className="text-sm leading-6" style={{ fontWeight: 300, color: MUTED }}>{text}</p>
                </div>
              ))}
            </div>

            <div className="mb-6 mt-10 h-px" style={{ background: 'rgba(13,148,136,0.25)' }} />
            <p className="text-xl font-semibold" style={{ color: TANG }}>Float was built for exactly this.</p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-20 lg:py-28" style={{ backgroundColor: LIGHT }}>
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 lg:grid-cols-[1fr,0.85fr] lg:items-start lg:gap-16 lg:px-8">
            <div>
              <p className="uppercase tracking-[0.25em]" style={LABEL}>How it works</p>
              <h2 className="mt-4 text-3xl font-bold lg:text-4xl" style={{ color: DARK }}>
                Float an idea. See who's in. Own your days.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7" style={{ fontWeight: 300, color: MUTED }}>
                Anyone in the group can propose anything — then everyone decides what they're joining. No one person
                runs the show.
              </p>

              <ol className="relative mt-10 space-y-6 border-l-2 border-dashed pl-10" style={{ borderColor: 'rgba(13,148,136,0.28)' }}>
                {howItWorks.map(({ step, title, detail, icon: Icon }) => (
                  <li key={step} className="relative">
                    <div
                      className="absolute -left-[3.25rem] flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ ...MONO, background: TANG, boxShadow: '0 8px 20px -6px rgba(13,148,136,0.35)' }}
                    >
                      {step}
                    </div>
                    <div
                      className="rounded-sm p-5"
                      style={{ background: '#FFFFFF', border: '1px solid rgba(13,148,136,0.12)', boxShadow: '0 4px 16px -8px rgba(13,61,57,0.08)' }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" style={{ color: TANG }} />
                        <h3 className="text-lg font-semibold" style={{ color: DARK }}>{title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-7" style={{ fontWeight: 300, color: MUTED }}>{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative hidden overflow-hidden rounded-sm lg:block" style={{ background: '#C8EDE9', maxHeight: '600px' }}>
              <img
                src="/landing/hf_20260617_003956_ffd53767-1812-4f96-95ba-c01ad3bb72c7.png"
                alt=""
                role="presentation"
                className="h-full w-full object-cover object-[center_20%]"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
              />
              <div className="absolute inset-y-0 left-0 w-1/3" style={{ background: 'linear-gradient(to right, rgba(240,253,250,0.5), transparent)' }} />
              <div
                className="absolute bottom-4 left-4 right-4 rounded-sm p-4"
                style={{ background: 'rgba(240,253,250,0.95)', backdropFilter: 'blur(8px)', boxShadow: '0 8px 24px -8px rgba(13,61,57,0.12)' }}
              >
                <p className="uppercase tracking-widest" style={{ ...MONO, color: TANG, fontSize: '10px' }}>From Float users</p>
                <p className="mt-1 text-sm font-medium" style={{ color: DARK }}>
                  "I stopped dreading the group planning chat the moment everyone could just float their own ideas."
                </p>
                <p className="mt-1 text-xs" style={{ ...MONO, color: MUTED }}>— Jake, group trip to Japan (12 people)</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE SHOWCASE */}
        <section className="py-20 lg:py-28" style={{ backgroundColor: ALT }}>
          <div className="mx-auto w-full max-w-6xl space-y-20 px-4 lg:space-y-28 lg:px-8">

            {/* Feature 1: Wish List */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <p className="inline-flex items-center gap-1.5 uppercase tracking-[0.25em]" style={LABEL}>
                  <List className="h-3 w-3" /> Wish List
                </p>
                <h3 className="mt-4 text-2xl font-bold lg:text-3xl" style={{ color: DARK }}>
                  One place for every idea, from anyone in the group
                </h3>
                <p className="mt-4 text-base leading-7" style={{ fontWeight: 300, color: MUTED }}>
                  Anyone can add a flight option, hotel, activity, or restaurant. Nothing lives in someone's DMs or
                  gets buried in the chat. Every idea is visible to the whole group the moment it's posted.
                </p>
              </div>
              <div className="rounded-sm p-1" style={{ background: '#FFF', border: '1px solid rgba(13,148,136,0.12)', boxShadow: '0 8px 24px -8px rgba(13,61,57,0.08)' }}>
                <div className="rounded-sm bg-white p-5">
                  <p className="uppercase tracking-widest" style={{ ...MONO, color: TANG, fontSize: '10px' }}>Wish List · Maui Trip</p>
                  <div className="mt-4 space-y-2.5">
                    {[
                      { name: "Mama's Fish House", tag: "Dining", votes: 5, tagClass: "border-cyan-200 bg-cyan-50 text-cyan-700" },
                      { name: "Road to Hana Day Trip", tag: "Activity", votes: 4, tagClass: "border-violet-200 bg-violet-50 text-violet-700" },
                      { name: "Montage Kapalua Bay", tag: "Stay", votes: 3, tagClass: "border-sky-200 bg-sky-50 text-sky-700" },
                    ].map(({ name, tag, votes, tagClass }) => (
                      <div key={name} className="flex items-center justify-between gap-3 rounded-sm bg-white px-3 py-2.5" style={{ border: '1px solid rgba(13,148,136,0.10)' }}>
                        <div className="flex min-w-0 items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: TANG }} />
                          <span className="truncate text-sm font-medium" style={{ color: DARK }}>{name}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className={`rounded-sm border px-2 py-0.5 text-xs font-medium ${tagClass}`} style={MONO}>{tag}</span>
                          <span className="flex items-center gap-1 text-xs" style={{ ...MONO, color: MUTED }}>
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
                  <Vote className="h-3 w-3" /> Float &amp; Vote
                </p>
                <h3 className="mt-4 text-2xl font-bold lg:text-3xl" style={{ color: DARK }}>
                  Float it to the group. Find out who's in.
                </h3>
                <p className="mt-4 text-base leading-7" style={{ fontWeight: 300, color: MUTED }}>
                  When you're ready for a real decision, float it. Members vote yes, no, or maybe. No chasing
                  responses — the answer surfaces in real time and everyone can see exactly where it landed.
                </p>
              </div>
              <div className="rounded-sm p-1 lg:order-1" style={{ background: '#FFF', border: '1px solid rgba(13,148,136,0.12)', boxShadow: '0 8px 24px -8px rgba(13,61,57,0.08)' }}>
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
                          ? { borderColor: TANG, boxShadow: '0 0 0 2px rgba(13,148,136,0.15)' }
                          : { borderColor: 'rgba(13,148,136,0.12)' }}
                      >
                        <div className="flex justify-between text-sm">
                          <span className="font-medium" style={{ color: leader ? TANG : MUTED }}>{name}</span>
                          <span className="font-semibold" style={{ ...MONO, color: leader ? TANG : MUTED }}>{pct}%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full" style={{ background: 'rgba(13,148,136,0.08)' }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: leader ? TANG : 'rgba(13,148,136,0.20)' }} />
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
                  Every person's schedule, inside the group trip
                </h3>
                <p className="mt-4 text-base leading-7" style={{ fontWeight: 300, color: MUTED }}>
                  Confirmed plans land on a shared itinerary everyone can see. Each person knows exactly what they're
                  doing — and can see what the rest of the group has planned for any given day.
                </p>
              </div>
              <div className="rounded-sm p-1" style={{ background: '#FFF', border: '1px solid rgba(13,148,136,0.12)', boxShadow: '0 8px 24px -8px rgba(13,61,57,0.08)' }}>
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
                          { label: "Mama's Fish", cls: "bg-teal-100 text-teal-800" },
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
                      <div key={day} className="rounded-sm p-2" style={{ border: '1px solid rgba(13,148,136,0.10)' }}>
                        <p className="text-xs font-semibold" style={{ ...MONO, color: MUTED }}>{day}</p>
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
                  Know who's joining — before the morning of
                </h3>
                <p className="mt-4 text-base leading-7" style={{ fontWeight: 300, color: MUTED }}>
                  Float an activity, get a live headcount. No more "who's actually coming?" texts the day before.
                  Plan for the right group size, book the right table, and move on.
                </p>
              </div>
              <div className="rounded-sm p-1 lg:order-1" style={{ background: '#FFF', border: '1px solid rgba(13,148,136,0.12)', boxShadow: '0 8px 24px -8px rgba(13,61,57,0.08)' }}>
                <div className="rounded-sm bg-white p-5">
                  <p className="uppercase tracking-widest" style={{ ...MONO, color: TANG, fontSize: '10px' }}>RSVP · Road to Hana</p>
                  <div className="mt-4 space-y-2">
                    {[
                      { initials: "AL", name: "Alec", status: "confirmed" as const, color: "bg-teal-500" },
                      { initials: "MJ", name: "Mia", status: "confirmed" as const, color: "bg-cyan-500" },
                      { initials: "SR", name: "Sam", status: "confirmed" as const, color: "bg-teal-400" },
                      { initials: "JK", name: "Jordan", status: "pending" as const, color: "bg-stone-400" },
                      { initials: "TL", name: "Tyler", status: "declined" as const, color: "bg-stone-300" },
                    ].map(({ initials, name, status, color }) => (
                      <div
                        key={name}
                        className="flex items-center gap-3 rounded-sm px-3 py-2"
                        style={{ border: '1px solid rgba(13,148,136,0.10)', background: '#F8FFFE' }}
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
        <section className="relative overflow-hidden py-20 lg:py-24" style={{ backgroundColor: LIGHT }}>
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(13,148,136,0.10), transparent 60%)' }} />
          <div className="relative mx-auto w-full max-w-6xl px-4 lg:px-8">
            <p className="uppercase tracking-[0.25em]" style={LABEL}>Why Float</p>
            <h2 className="mt-4 text-3xl font-bold lg:text-4xl" style={{ color: DARK }}>
              Planning a trip together should feel like being on it.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7" style={{ fontWeight: 300, color: MUTED }}>
              Float is built for groups where everyone has different interests and a different idea of a perfect day.
              We make it easy for everyone to contribute — and to own their own experience.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {benefits.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-sm p-8"
                  style={{ background: '#FFFFFF', border: '1px solid rgba(13,148,136,0.20)', boxShadow: '0 4px 16px -8px rgba(13,148,136,0.12)' }}
                >
                  <div className="inline-flex rounded-sm p-3" style={{ background: 'rgba(13,148,136,0.10)' }}>
                    <Icon className="h-6 w-6" style={{ color: TANG }} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold" style={{ color: DARK }}>{title}</h3>
                  <p className="mt-3 text-sm leading-7" style={{ fontWeight: 300, color: MUTED }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden px-4 py-24 lg:px-8 lg:py-32" style={{ backgroundColor: TANG }}>
          <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.12), transparent 70%)' }} />
          <div className="relative mx-auto w-full max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.2em]" style={{ ...MONO, color: 'rgba(255,255,255,0.70)' }}>
              Your next adventure is waiting
            </p>
            <h2 className="mt-5 text-4xl font-bold lg:text-5xl" style={{ color: '#FFFFFF', lineHeight: 1.05 }}>
              Stop running the trip.
              <br />
              Start floating it.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed" style={{ fontWeight: 300, color: 'rgba(255,255,255,0.80)' }}>
              Float gives everyone in your group a voice, a plan, and the freedom to make the trip their own. Free to
              start — your whole crew gets access.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => (window.location.href = "/register")}
                className="h-14 rounded-sm px-10 text-base font-semibold transition-transform hover:-translate-y-0.5"
                style={{ ...MONO, background: '#FFFFFF', color: TANG, letterSpacing: '0.02em', boxShadow: '0 16px 40px -12px rgba(13,61,57,0.25)' }}
              >
                Start floating — it's free
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/login")}
                className="h-14 rounded-sm px-10 text-base"
                style={{ ...MONO, borderColor: 'rgba(255,255,255,0.45)', color: '#FFFFFF', background: 'transparent', letterSpacing: '0.02em' }}
              >
                Log in
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm" style={{ ...MONO, color: 'rgba(255,255,255,0.70)' }}>
              {["Free to start", "No credit card", "Your whole group gets access"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: 'rgba(255,255,255,0.55)' }} />
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
