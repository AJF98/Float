import { useEffect, useState } from "react"
import floatLogo from "@/assets/float-logo.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarCheck2, Compass, ListChecks, MapPinned, Users2, Vote } from "lucide-react"

const painStats = [
  { value: "15+", label: "messages to pick dinner" },
  { value: "3", label: "days to book flights" },
  { value: "1", label: "friend doing all the work" },
  { value: "0", label: "clear source of truth" },
]

const featureCards = [
  {
    title: "Proposals & voting that actually finishes",
    description:
      "Turn options into quick decisions with simple voting that keeps momentum moving.",
    icon: Vote,
  },
  {
    title: "Trip creator authority (finalize with one click)",
    description:
      "Collaborate as a group while the trip creator can lock in the final plan when it is time.",
    icon: Users2,
  },
  {
    title: "Calendar sync for confirmed plans",
    description:
      "Publish only finalized picks so everyone sees the same schedule in their own calendar.",
    icon: CalendarCheck2,
  },
  {
    title: "Shared itinerary + filters by person/day",
    description:
      "Scan plans by traveler or by day so nobody has to ask where they should be next.",
    icon: ListChecks,
  },
  {
    title: "Offline Travel Mode",
    description: "Coming soon: view your must-know trip details even when signal gets spotty.",
    icon: Compass,
  },
]

const howItWorks = [
  {
    step: "1",
    title: "Float ideas",
    detail: "Propose flights, hotels, and restaurants in one shared planning space.",
  },
  {
    step: "2",
    title: "Vote & decide",
    detail: "Rank options and quickly converge on what the group actually wants.",
  },
  {
    step: "3",
    title: "Confirm & sync",
    detail: "Lock plans and instantly add the confirmed itinerary to everyone’s calendars.",
  },
]

const cardClass = "rounded-3xl border border-slate-200 bg-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.55)]"

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50/70 to-violet-50/60 text-slate-900">
      <nav
        className={`sticky top-0 z-30 border-b transition-all duration-300 ${
          isScrolled
            ? "border-cyan-100/90 bg-white/92 backdrop-blur-xl"
            : "border-transparent bg-white/75 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
            aria-label="Float home"
          >
            <img src={floatLogo} alt="Float" className="h-12 w-auto" />
            <span className="text-2xl font-bold tracking-tight">Float</span>
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-full border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              onClick={() => (window.location.href = "/login")}
            >
              Log in
            </Button>
            <Button
              onClick={() => (window.location.href = "/register")}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-5 text-white"
            >
              Get started
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/landing/beach-hero.svg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/92 to-cyan-100/45" />

          <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:py-20 lg:px-8">
            <div>
              <p className="inline-flex rounded-full border border-cyan-200 bg-white/90 px-4 py-1 text-sm font-medium text-cyan-900">
                Built for group trips and shared decisions
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Plan trips together—without the chaos.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700">
                Float turns group chats into decisions. Propose options, vote fast, and sync the final itinerary to
                everyone’s calendar.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={() => (window.location.href = "/register")}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-white"
                >
                  Start a trip
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                >
                  See how it works
                </Button>
              </div>
            </div>

            <Card className={`${cardClass} p-2`}>
              <CardContent className="space-y-4 rounded-2xl bg-white p-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">Friday options</p>
                  <p className="mt-2 font-semibold">Dinner shortlist is ready for votes</p>
                  <p className="mt-1 text-sm text-slate-600">4 options · 7 travelers · deadline tonight</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-800">Confirmed</p>
                  <p className="mt-2 font-semibold">Sunrise ferry + beach brunch</p>
                  <p className="mt-1 text-sm text-slate-600">Finalized by trip creator · synced to calendars</p>
                </div>
                <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-sm text-slate-700">
                  A single, clean itinerary everyone can trust.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
          <div className={`${cardClass} p-8 md:p-10`}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">The group-trip reality</p>
            <h2 className="mt-3 text-3xl font-bold">Planning falls apart in the chat</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {painStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-3xl font-bold text-cyan-700">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-4 lg:px-8 lg:py-6">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              "One place for ideas, votes, and final decisions",
              "Clear ownership so plans stop stalling",
              "An itinerary your whole group can actually follow",
            ].map((line) => (
              <Card key={line} className={cardClass}>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="mt-0.5 rounded-xl border border-cyan-200 bg-cyan-100 p-2 text-cyan-800">
                    <MapPinned className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{line}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-bold">Float fixes this</h2>
          <p className="mt-3 max-w-2xl text-slate-600">Everything your group needs to move from maybe to booked.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map(({ title, description, icon: Icon }) => (
              <Card key={title} className={cardClass}>
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl border border-violet-200 bg-violet-100 p-2.5 text-violet-800">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-lg font-semibold leading-snug">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-8 lg:py-10">
          <div className={`${cardClass} p-8 md:p-10`}>
            <h2 className="text-3xl font-bold">How it works</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {howItWorks.map(({ step, title, detail }) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-sm font-semibold text-cyan-800">
                    {step}
                  </p>
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-cyan-50 to-violet-50 p-8 text-center shadow-[0_20px_40px_-32px_rgba(14,116,144,0.5)] md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Get early planning tips</p>
            <h2 className="mt-3 text-3xl font-bold">Start your next trip with less back-and-forth</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Drop your email for practical trip-planning ideas, then launch your group itinerary in Float.
            </p>
            <form
              className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@travelcrew.com"
                className="h-11 flex-1 rounded-full border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none ring-cyan-300 transition focus:ring-2"
                aria-label="Email address"
              />
              <Button type="submit" className="h-11 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-6 text-white">
                Get trip tips
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}
