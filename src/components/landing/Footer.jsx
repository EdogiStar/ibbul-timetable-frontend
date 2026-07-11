import { Link } from "react-router-dom";
import {
  GraduationCap,
  Globe,
  Mail,
} from "lucide-react";
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <GraduationCap size={26} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  IBBUL TSS
                </h3>

                <p className="text-sm text-gray-400">
                  Timetable Scheduling System
                </p>
              </div>

            </div>

            <p className="mt-6 leading-7 text-gray-400">
              A web-based academic timetable scheduling platform built
              to support efficient administration at Ibrahim Badamasi
              Babangida University, Lapai.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h4 className="mb-6 text-lg font-semibold text-white">
              Quick Links
            </h4>

            <div className="space-y-4">

              <a href="#about" className="block hover:text-emerald-400">
                About
              </a>

              <a href="#features" className="block hover:text-emerald-400">
                Features
              </a>

              <a href="#workflow" className="block hover:text-emerald-400">
                Workflow
              </a>

              <a href="#technology" className="block hover:text-emerald-400">
                Technology
              </a>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h4 className="mb-6 text-lg font-semibold text-white">
              Project
            </h4>

            <div className="space-y-4">

              <Link
                to="/login"
                className="flex items-center gap-3 hover:text-emerald-400"
              >
                <GraduationCap size={18} />
                Launch Application
              </Link>

              <a
                href="mailto:admin@ibbul.edu.ng"
                className="flex items-center gap-3 hover:text-emerald-400"
              >
                <Mail size={18} />
                admin@ibbul.edu.ng
              </a>

              <a
                href="https://github.com/EdogiStar"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-emerald-400"
              >
                <Globe size={18} />
                GitHub
              </a>

            </div>

          </div>

        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">

          © {new Date().getFullYear()} IBBUL Timetable Scheduling System.
          Built with React, Express.js and Supabase.

        </div>

      </div>
    </footer>
  );
}

export default Footer;