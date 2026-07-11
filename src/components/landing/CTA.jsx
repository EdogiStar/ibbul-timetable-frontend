import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-700 py-24 text-white">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-600 shadow-lg">
          <ShieldCheck size={42} />
        </div>

        <h2 className="mt-8 text-4xl font-bold md:text-5xl">
          Ready to Explore IBBUL TSS?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-emerald-100">
          Experience a modern platform designed to simplify academic
          administration, centralize university data, and support
          efficient timetable scheduling for Ibrahim Badamasi Babangida
          University.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-emerald-700 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
          >
            Launch Application
            <ArrowRight size={20} />
          </Link>

          <a
            href="#features"
            className="rounded-xl border border-white/40 px-8 py-4 text-lg font-medium transition hover:bg-white/10"
          >
            Explore Features
          </a>

        </div>

      </div>
    </section>
  );
}

export default CTA;