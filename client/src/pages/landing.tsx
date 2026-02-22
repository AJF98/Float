import floatLogo from "@/assets/float-logo.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarCheck, ClipboardList, Crown, Sparkles, Vote } from "lucide-react"

const howItWorks = [
  {
    title: "Float ideas",
    description: "Drop options into one shared board so everyone can see the same plan in real time.",
    icon: Sparkles,
  },
  {
    title: "Vote & decide",
    description: "Quick polls help your group choose the best option without endless back-and-forth.",
    icon: Vote,
  },
  {
    title: "Sync to calendar",
    description: "Confirmed plans sync to calendars so nobody misses the moments that matter.",
    icon: CalendarCheck,
  },
]

const benefits = [
  {
    title: "Shared itinerary",
    description: "Keep flights, stays, meals, and activities in one clear timeline.",
    icon: ClipboardList,
  },
  {
    title: "Fast decisions",
    description: "Turn group opinions into clear choices in minutes, not days.",
    icon: Vote,
  },
  {
    title: "Calendar sync",
    description: "Push confirmed events to calendars so everyone stays aligned.",
    icon: CalendarCheck,
  },
  {
    title: "Owner control",
    description: "Trip owners keep structure while collaborators can still contribute.",
    icon: Crown,
  },
]

const testimonials = [
  {
    quote: "Float made our reunion trip feel effortless—everyone knew the plan and actually showed up on time.",
    name: "Maya R.",
  },
  {
    quote: "We stopped debating in chat and started voting in Float. Decisions became instant.",
    name: "Jordan P.",
  },
  {
    quote: "The shared itinerary gave our whole group confidence. No more confusion, no more duplicate plans.",
    name: "Elena T.",
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50 to-violet-50 text-slate-900">
      <nav className="sticky top-0 z-20 border-b border-cyan-100/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-2">
            <img src={floatLogo} alt="Float" className="h-9 w-auto" />
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <button onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })} className="transition hover:text-slate-900">Features</button>
            <button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="transition hover:text-slate-900">How it works</button>
            <button onClick={() => document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" })} className="transition hover:text-slate-900">Stories</button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden rounded-full border-cyan-200 bg-white text-slate-700 hover:bg-cyan-50 sm:inline-flex"
              onClick={() => (window.location.href = "/login")}
            >
              Log in
            </Button>
            <Button
              onClick={() => (window.location.href = "/register")}
              className="rounded-full bg-gradient-to-r from-teal-500 to-violet-500 px-5 text-white shadow-md shadow-teal-200 transition hover:opacity-95"
            >
              Get started
            </Button>
          </div>
        </div>
      </nav>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 pt-16 lg:grid-cols-[1.05fr,0.95fr] lg:items-center lg:px-8 lg:pt-20">
          <div>
            <p className="inline-flex rounded-full border border-cyan-200 bg-white/80 px-4 py-1 text-sm font-medium text-cyan-700">
              Group travel made simple
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
              Plan trips together—without the chaos.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Float keeps plans, RSVPs, and decisions in one shared itinerary everyone can trust.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => (window.location.href = "/register")}
                className="rounded-full bg-gradient-to-r from-teal-500 to-violet-500 px-6 text-white shadow-md shadow-teal-200"
              >
                Start a trip
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-cyan-200 bg-white text-slate-700 hover:bg-cyan-50"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                See how it works
              </Button>
            </div>
          </div>

          <Card className="rounded-3xl border-cyan-100 bg-white/95 p-2 shadow-xl shadow-cyan-100">
            <CardContent className="space-y-4 rounded-2xl bg-gradient-to-br from-white to-cyan-50 p-5">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Thursday · 1:30 PM</p>
                <p className="mt-2 font-semibold">Kayak along the coast</p>
                <p className="mt-1 text-sm text-slate-500">6 going · 2 maybe · calendar synced</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Friday · 9:00 AM</p>
                <p className="mt-2 font-semibold">Local breakfast meetup</p>
                <p className="mt-1 text-sm text-slate-500">RSVPs finalized · reminder set</p>
              </div>
              <div className="rounded-2xl border border-teal-100 bg-teal-50 p-4 text-sm text-teal-700">
                Product preview: one clean, shared itinerary view for the whole group.
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-bold">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {howItWorks.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="rounded-3xl border-cyan-100 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-cyan-50 p-3 text-cyan-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-bold">Why groups choose Float</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="rounded-3xl border-cyan-100 bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-violet-50 p-3 text-violet-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="stories" className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-bold">What travelers say</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <Card key={item.name} className="rounded-3xl border-cyan-100 bg-white shadow-sm">
                <CardContent className="p-6">
                  <p className="text-slate-700">“{item.quote}”</p>
                  <p className="mt-4 text-sm font-semibold text-slate-500">{item.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 lg:px-8">
          <div className="rounded-[28px] border border-cyan-100 bg-gradient-to-r from-cyan-100/70 via-white to-violet-100/70 px-6 py-12 text-center shadow-sm">
            <h2 className="text-3xl font-bold">Ready to plan your next group trip?</h2>
            <Button
              onClick={() => (window.location.href = "/register")}
              className="mt-6 rounded-full bg-gradient-to-r from-teal-500 to-violet-500 px-8 text-white shadow-md shadow-teal-200"
            >
              Get started
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
