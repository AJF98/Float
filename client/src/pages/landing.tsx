import { useEffect, useState } from "react"
import floatLogo from "@/assets/float-logo.png"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarCheck2, Compass, ListChecks, MapPinned, Users2, Vote } from "lucide-react"

const featureCards = [
  {
    title: "Proposals and voting that actually finishes",
    description:
      "Turn options into fast decisions with a shared vote flow that keeps everyone aligned.",
    icon: Vote,
  },
  {
    title: "Clear trip ownership with group collaboration",
    description:
      "Everyone can contribute ideas while trip creators keep momentum and finalize with confidence.",
    icon: Users2,
  },
  {
    title: "Calendar sync for confirmed plans only",
    description:
      "Publish only finalized picks so your whole group sees one trusted schedule across devices.",
    icon: CalendarCheck2,
  },
  {
    title: "Shared itinerary filters by day or traveler",
    description:
      "Find the right plan in seconds by drilling into specific people and moments.",
    icon: ListChecks,
  },
  {
    title: "Offline travel mode for key details",
    description: "Keep essential itinerary info available even when your connection gets unreliable.",
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
    title: "Vote and decide",
    detail: "Rank options quickly so your group converges without endless chat threads.",
  },
  {
    step: "3",
    title: "Confirm and sync",
    detail: "Lock the final picks and publish a clean itinerary everyone can trust.",
  },
]

const whyGroupsChooseFloat = [
  "One place for ideas, votes, and final decisions.",
  "Clear ownership so planning doesn’t stall.",
  "A polished itinerary that everyone can follow.",
]

const cardClass =
  "rounded-3xl border border-violet-200/70 bg-gradient-to-br from-white via-violet-50/65 to-cyan-50/70 shadow-[0_18px_40px_-30px_rgba(67,56,202,0.55)]"

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-cyan-50/80 to-violet-100/65 text-slate-900">
      <nav
        className={`sticky top-0 z-30 border-b transition-all duration-300 ${
          isScrolled
            ? "border-cyan-100/90 bg-white/90 backdrop-blur-xl"
            : "border-transparent bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
            aria-label="Float home"
          >
            <img src={floatLogo} alt="Float" className="h-12 w-auto drop-shadow-sm sm:h-14" />
            <span className="text-3xl font-semibold tracking-tight text-slate-900">Float</span>
          </button>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-full border-cyan-200 bg-white/90 px-5 text-slate-700 hover:bg-cyan-50"
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
        <section className="relative overflow-hidden border-b border-cyan-100/70">
          <div
            className="absolute inset-0 bg-cover bg-right"
            style={{ backgroundImage: "url('/landing/beach-hero.svg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-[55%] to-white/10" />

          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.1fr,0.9fr] lg:items-center lg:px-8 lg:py-24">
            <div>
              <p className="inline-flex rounded-full border border-violet-200 bg-white/95 px-4 py-1.5 text-sm font-medium text-violet-900">
                Group trip planning for real friend groups
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Beach-day energy for your group travel plans.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-800 sm:text-xl">
                Float brings ideas, votes, and confirmed plans into one bright, organized hub so everyone knows
                what&apos;s booked and what&apos;s next.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  onClick={() => (window.location.href = "/register")}
                  className="h-11 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-7 text-base text-white shadow-[0_12px_30px_-14px_rgba(99,102,241,0.75)]"
                >
                  Get started
                </Button>
                <Button
                  variant="outline"
                  className="h-11 rounded-full border-slate-300 bg-white/95 px-7 text-base text-slate-700 hover:bg-slate-50"
                  onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                >
                  See how it works
                </Button>
              </div>
            </div>

            <Card className={`${cardClass} mx-auto w-full max-w-md p-2`}>
              <CardContent className="space-y-4 rounded-2xl bg-white/90 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Float preview</p>
                <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-violet-100/80 p-4">
                  <p className="text-sm font-semibold text-cyan-900">Trip dashboard</p>
                  <p className="mt-2 text-lg font-semibold text-slate-950">Maui weekend crew</p>
                  <p className="mt-1 text-sm text-slate-950">12 plans tracked · 8 confirmed · 7 travelers</p>
                </div>
                <div className="rounded-2xl border border-violet-200/70 bg-gradient-to-r from-violet-50 to-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-800">Next decision</p>
                  <p className="mt-2 text-base font-semibold text-slate-950">Friday sunset dinner shortlist</p>
                  <p className="mt-1 text-sm leading-6 text-slate-950">Voting closes tonight at 8:00 PM.</p>
                </div>
                <div className="rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-violet-50 p-4 text-sm leading-6 text-slate-950">
                  One source of truth for your group itinerary, from first idea to final booking.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="how-it-works" className="bg-gradient-to-b from-white via-violet-50/55 to-cyan-50/50 py-16 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-950 lg:text-4xl">How it works</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Built to keep group plans moving with clarity, speed, and fewer repetitive messages.
            </p>

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {howItWorks.map(({ step, title, detail }) => (
                <Card key={title} className={cardClass}>
                  <CardContent className="p-6">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-100 to-violet-200 text-sm font-semibold text-slate-900">
                      {step}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-950">{detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-violet-100/55 via-violet-50/50 to-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-950 lg:text-4xl">Why groups choose Float</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Keep every traveler informed with readable updates, clear responsibilities, and calm coordination.
            </p>

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {whyGroupsChooseFloat.map((line) => (
                <Card key={line} className={cardClass}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="mt-0.5 rounded-xl bg-gradient-to-r from-cyan-100 to-violet-200 p-2.5 text-cyan-900">
                      <MapPinned className="h-4 w-4" />
                    </div>
                    <p className="text-base leading-7 text-slate-950">{line}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white via-cyan-50/65 to-violet-100/50 py-16 lg:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-950 lg:text-4xl">Float fixes the group-planning mess</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Core tools that make collaborative trip planning feel simple and highly readable.
            </p>

            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featureCards.map(({ title, description, icon: Icon }) => (
                <Card key={title} className={cardClass}>
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-xl bg-gradient-to-r from-cyan-100 to-violet-200 p-2.5 text-violet-900">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-semibold leading-7 text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-950">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-12 lg:px-8">
          <div className="mx-auto w-full max-w-6xl rounded-3xl border border-violet-200/70 bg-gradient-to-r from-violet-50/80 via-cyan-50/80 to-white p-8 text-center shadow-[0_20px_45px_-34px_rgba(99,102,241,0.5)] md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Plan your next escape</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">Start your next trip with less back-and-forth</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Float helps your group decide faster, stay aligned, and enjoy the trip instead of managing chaos.
            </p>
            <div className="mx-auto mt-7 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={() => (window.location.href = "/register")}
                className="h-11 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-8 text-base text-white"
              >
                Get started
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/login")}
                className="h-11 rounded-full border-slate-300 bg-white px-8 text-base text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
