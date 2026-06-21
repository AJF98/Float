import { useEffect, useState } from "react"
import floatLogo from "@/assets/float-logo.png"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

const cardClass =
  "rounded-3xl border border-violet-200/70 bg-gradient-to-br from-white via-violet-50/65 to-cyan-50/70 shadow-[0_18px_40px_-30px_rgba(67,56,202,0.55)]"

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
    iconClass: "text-cyan-400",
    bgClass: "bg-cyan-400/10",
    title: "Everyone has a voice",
    body: "No one person has to carry the planning load. Ideas come from everywhere, votes are equal, and decisions feel shared — so the whole group feels ownership over the trip.",
  },
  {
    icon: CheckCircle2,
    iconClass: "text-violet-400",
    bgClass: "bg-violet-400/10",
    title: "Clarity at every step",
    body: "You always know what's confirmed, what's still being decided, and who's responsible for what. No ambiguity. No surprise changes. One source of truth for the whole group.",
  },
  {
    icon: Heart,
    iconClass: "text-pink-400",
    bgClass: "bg-pink-400/10",
    title: "More trip, less admin",
    body: "Float handles the coordination busywork so you can spend your mental energy on the things that actually matter — being excited about where you're going, not stressed about how to get there.",
  },
]

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen text-slate-900">
      {/* NAV */}
      <nav
        className={`sticky top-0 z-30 border-b transition-all duration-300 ${
          isScrolled
            ? "border-cyan-100/60 bg-white/90 shadow-sm backdrop-blur-2xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
            aria-label="Float home"
          >
            <img src={floatLogo} alt="Float" className="h-12 w-auto drop-shadow-sm sm:h-14" />
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className={`rounded-full px-5 transition-colors ${
                isScrolled
                  ? "border-cyan-200 bg-white/90 text-slate-700 hover:bg-cyan-50"
                  : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              }`}
              onClick={() => (window.location.href = "/login")}
            >
              Log in
            </Button>
            <Button
              onClick={() => (window.location.href = "/register")}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 text-white shadow-[0_10px_25px_-12px_rgba(99,102,241,0.8)]"
            >
              Get started
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-slate-900">
          <img
            src="/landing/beach-group-1.jpg"
            alt=""
            role="presentation"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
            loading="eager"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
          />
          {/* Left-to-right scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/88 via-slate-950/60 to-slate-950/10" />
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-28 lg:px-8 lg:py-36">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Plan together. Arrive happy.
              </p>

              <h1 className="mt-6 text-5xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
                Group trips that actually{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
                  come together
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200 sm:text-xl">
                Float gives everyone in your crew one shared space to float ideas, vote on favorites, and lock down a
                real itinerary — no chasing responses, no lost messages, no last-minute chaos.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => (window.location.href = "/register")}
                  className="h-12 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 text-base text-white shadow-[0_16px_40px_-12px_rgba(6,182,212,0.55)] transition-transform hover:-translate-y-0.5"
                >
                  Plan your trip — it's free
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                  className="h-12 rounded-full border-white/30 bg-white/10 px-8 text-base text-white backdrop-blur-sm hover:bg-white/20"
                >
                  See how it works
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {(["A", "M", "J", "S", "R"] as const).map((letter, i) => (
                    <Avatar key={letter} className="h-8 w-8 border-2 border-white/20">
                      <AvatarFallback
                        className={`text-xs font-semibold text-white ${["bg-cyan-500", "bg-violet-500", "bg-pink-500", "bg-sky-500", "bg-indigo-500"][i]}`}
                      >
                        {letter}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Separator orientation="vertical" className="h-5 bg-white/20" />
                <p className="text-sm text-slate-300">
                  Joined by <span className="font-semibold text-white">4,200+</span> group travelers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PAIN POINT STRIP */}
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(6,182,212,0.07),transparent_60%)]" />
          <div className="relative mx-auto w-full max-w-6xl px-4 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">Sound familiar?</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white lg:text-4xl">
              Planning a group trip shouldn't feel like herding cats in a group chat
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
              Seventeen open tabs. A 300-message thread nobody's reading. Half the group is annoyed, the other half is
              winging it. By the time you leave, the planning itself has drained the excitement.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {painPoints.map(({ icon: Icon, iconClass, bgClass, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 transition-colors hover:border-white/[0.15]"
                >
                  <div className={`mt-0.5 shrink-0 rounded-lg p-2 ${bgClass}`}>
                    <Icon className={`h-4 w-4 ${iconClass}`} />
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>

            <Separator className="mb-6 mt-10 bg-white/10" />
            <p className="text-xl font-semibold text-cyan-300">Float was built for exactly this.</p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="bg-gradient-to-b from-white via-sky-50/40 to-violet-50/30 py-20 lg:py-28"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 lg:grid-cols-[1fr,0.85fr] lg:items-stretch lg:gap-16 lg:px-8">
            {/* Left: steps */}
            <div>
              <Badge className="rounded-full border-violet-200 bg-violet-50 px-3 py-1 text-sm text-violet-700">
                How it works
              </Badge>
              <h2 className="mt-4 text-3xl font-bold text-slate-950 lg:text-4xl">
                From a half-baked idea to a confirmed itinerary in three steps
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
                Built to keep group plans moving with clarity, speed, and fewer repetitive messages.
              </p>

              <ol className="relative mt-10 space-y-6 border-l-2 border-dashed border-violet-200 pl-10">
                {howItWorks.map(({ step, title, detail, icon: Icon }) => (
                  <li key={step} className="relative">
                    <div className="absolute -left-[3.25rem] flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-xs font-bold text-white shadow-[0_8px_20px_-6px_rgba(99,102,241,0.5)]">
                      {step}
                    </div>
                    <div className="rounded-2xl border border-violet-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-violet-500" />
                        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right: Photo 2 */}
            <div className="relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-50 to-violet-100 lg:block">
              <img
                src="/landing/beach-group-2.jpg"
                alt=""
                role="presentation"
                className="h-full w-full object-cover object-center"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
              />
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-700">From Float users</p>
                <p className="mt-1 text-sm font-medium text-slate-800">
                  "We used to spend an hour just agreeing on dinner. Now we vote and move on."
                </p>
                <p className="mt-1 text-xs text-slate-500">— Mia, group trip to Portugal</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE SHOWCASE */}
        <section className="bg-gradient-to-b from-violet-50/40 via-white to-sky-50/30 py-20 lg:py-28">
          <div className="mx-auto w-full max-w-6xl space-y-20 px-4 lg:space-y-28 lg:px-8">

            {/* Feature 1: Wish List */}
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <Badge className="rounded-full border-cyan-200 bg-cyan-50 px-3 py-1 text-sm text-cyan-700">
                  <List className="mr-1.5 inline h-3.5 w-3.5" />
                  Wish List
                </Badge>
                <h3 className="mt-4 text-2xl font-bold text-slate-950 lg:text-3xl">
                  One place for every idea, from any member
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Your group drops links, suggestions, and notes into a shared wish list. Nothing gets lost in a chat
                  thread. Everything is visible, sortable, and ready to act on when the time comes.
                </p>
              </div>
              <div className={`${cardClass} p-1`}>
                <div className="rounded-2xl bg-white/90 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-700">Wish List · Maui Trip</p>
                  <div className="mt-4 space-y-2.5">
                    {[
                      { name: "Mama's Fish House", tag: "Dining", votes: 5, tagClass: "border-cyan-200 bg-cyan-50 text-cyan-700" },
                      { name: "Road to Hana Day Trip", tag: "Activity", votes: 4, tagClass: "border-violet-200 bg-violet-50 text-violet-700" },
                      { name: "Montage Kapalua Bay", tag: "Stay", votes: 3, tagClass: "border-sky-200 bg-sky-50 text-sky-700" },
                    ].map(({ name, tag, votes, tagClass }) => (
                      <div key={name} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2.5">
                        <div className="flex min-w-0 items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-500" />
                          <span className="truncate text-sm font-medium text-slate-800">{name}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${tagClass}`}>{tag}</span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
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
                <Badge className="rounded-full border-violet-200 bg-violet-50 px-3 py-1 text-sm text-violet-700">
                  <Vote className="mr-1.5 inline h-3.5 w-3.5" />
                  Proposals &amp; Voting
                </Badge>
                <h3 className="mt-4 text-2xl font-bold text-slate-950 lg:text-3xl">
                  Turn "thoughts?" into a decision in under a minute
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Float any wish-list item as a formal proposal. Members vote in real time. When a quorum is reached,
                  the proposal resolves — no follow-up message, no tally, no ambiguity.
                </p>
              </div>
              <div className={`${cardClass} p-1 lg:order-1`}>
                <div className="rounded-2xl bg-white/90 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-700">Active Vote</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">Friday sunset dinner</p>
                  <div className="mt-4 space-y-3">
                    {[
                      { name: "Mama's Fish House", pct: 75, leader: true },
                      { name: "Merriman's Maui", pct: 50, leader: false },
                      { name: "Lahaina Grill", pct: 25, leader: false },
                    ].map(({ name, pct, leader }) => (
                      <div
                        key={name}
                        className={`rounded-xl border p-3 ${leader ? "border-cyan-300 ring-2 ring-cyan-200/50" : "border-slate-100"}`}
                      >
                        <div className="flex justify-between text-sm">
                          <span className={`font-medium ${leader ? "text-cyan-800" : "text-slate-700"}`}>{name}</span>
                          <span className={`font-semibold ${leader ? "text-cyan-600" : "text-slate-500"}`}>{pct}%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${leader ? "bg-gradient-to-r from-cyan-400 to-violet-400" : "bg-slate-300"}`}
                            style={{ width: `${pct}%` }}
                          />
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
                <Badge className="rounded-full border-sky-200 bg-sky-50 px-3 py-1 text-sm text-sky-700">
                  <CalendarRange className="mr-1.5 inline h-3.5 w-3.5" />
                  Itinerary &amp; Calendar
                </Badge>
                <h3 className="mt-4 text-2xl font-bold text-slate-950 lg:text-3xl">
                  A shared schedule that only shows what's confirmed
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Confirmed items appear on a group itinerary everyone can trust. Sync it to your phone calendar. Each
                  member sees their days clearly. The chaos of "wait, is that still happening?" disappears.
                </p>
              </div>
              <div className={`${cardClass} p-1`}>
                <div className="rounded-2xl bg-white/90 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-700">Maui · July 12–14</p>
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
                          { label: "Mama's Fish", cls: "bg-cyan-100 text-cyan-800" },
                        ],
                      },
                      {
                        day: "Sun 14",
                        items: [
                          { label: "Snorkel Tour", cls: "bg-sky-100 text-sky-800" },
                          { label: "Depart 6pm", cls: "bg-slate-100 text-slate-600" },
                        ],
                      },
                    ].map(({ day, items }) => (
                      <div key={day} className="rounded-xl border border-slate-100 p-2">
                        <p className="text-xs font-semibold text-slate-500">{day}</p>
                        <div className="mt-1.5 space-y-1">
                          {items.map(({ label, cls }) => (
                            <p key={label} className={`rounded-lg px-2 py-1 text-xs font-medium ${cls}`}>
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
                <Badge className="rounded-full border-pink-200 bg-pink-50 px-3 py-1 text-sm text-pink-700">
                  <Users2 className="mr-1.5 inline h-3.5 w-3.5" />
                  RSVP Tracking
                </Badge>
                <h3 className="mt-4 text-2xl font-bold text-slate-950 lg:text-3xl">
                  Always know who's in — no more chasing replies
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Members RSVP per activity. You see a live roster of who's confirmed, who's out, and who hasn't
                  responded. Plan group sizes, book the right table, and stop guessing.
                </p>
              </div>
              <div className={`${cardClass} p-1 lg:order-1`}>
                <div className="rounded-2xl bg-white/90 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-700">RSVP · Road to Hana</p>
                  <div className="mt-4 space-y-2">
                    {[
                      { initials: "AL", name: "Alec", status: "confirmed" as const, color: "bg-cyan-500" },
                      { initials: "MJ", name: "Mia", status: "confirmed" as const, color: "bg-violet-500" },
                      { initials: "SR", name: "Sam", status: "confirmed" as const, color: "bg-pink-500" },
                      { initials: "JK", name: "Jordan", status: "pending" as const, color: "bg-sky-500" },
                      { initials: "TL", name: "Tyler", status: "declined" as const, color: "bg-slate-400" },
                    ].map(({ initials, name, status, color }) => (
                      <div key={name} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white/80 px-3 py-2">
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${color}`}>
                          {initials}
                        </div>
                        <span className="flex-1 text-sm font-medium text-slate-800">{name}</span>
                        {status === "confirmed" && (
                          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Going
                          </span>
                        )}
                        {status === "pending" && (
                          <span className="text-xs font-medium text-amber-600">Pending</span>
                        )}
                        {status === "declined" && (
                          <span className="flex items-center gap-1 text-xs font-medium text-rose-500">
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
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(139,92,246,0.07),transparent_60%)]" />
          <div className="relative mx-auto w-full max-w-6xl px-4 lg:px-8">
            <Badge className="rounded-full border-violet-700/50 bg-violet-900/40 px-3 py-1 text-xs text-violet-300">
              Why Float
            </Badge>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Planning should feel like part of the trip, not a job before it
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
              Float is designed around how friend groups actually work — messy, busy, opinionated, and worth the
              coordination.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {benefits.map(({ icon: Icon, iconClass, bgClass, title, body }) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <div className={`inline-flex rounded-2xl p-3 ${bgClass}`}>
                    <Icon className={`h-6 w-6 ${iconClass}`} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-gradient-to-br from-cyan-500 via-violet-500 to-violet-600 px-4 py-24 lg:px-8 lg:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
          <div className="relative mx-auto w-full max-w-4xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
              Your next adventure is waiting
            </p>
            <h2 className="mt-5 text-4xl font-bold leading-tight text-white lg:text-5xl">
              Stop planning in circles.
              <br />
              Start actually going places.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Float turns group trip chaos into collective momentum. Free to start, no credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => (window.location.href = "/register")}
                className="h-12 rounded-full bg-white px-8 text-base font-semibold text-slate-950 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.3)] hover:bg-white/90"
              >
                Create your first trip
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/login")}
                className="h-12 rounded-full border-white/40 bg-white/10 px-8 text-base text-white hover:bg-white/20"
              >
                Log in
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-5 text-sm text-white/70">
              {["Free to start", "No credit card", "Your whole group gets access"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-white/60" />
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
