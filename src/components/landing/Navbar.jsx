import { Link } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "Technology",
      href: "#technology",
    },
    {
      name: "Workflow",
      href: "#workflow",
    },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
            <GraduationCap size={26} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-emerald-700">
              IBBUL TSS
            </h1>

            <p className="text-xs text-gray-500">
              Ibrahim Badamasi Babangida University
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-medium text-gray-700 transition hover:text-emerald-600"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/login"
            className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Launch System
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-5 px-6 py-6">

            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block font-medium text-gray-700"
              >
                {item.name}
              </a>
            ))}

            <Link
              to="/login"
              className="block rounded-lg bg-emerald-600 py-3 text-center font-semibold text-white"
            >
              Launch System
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;