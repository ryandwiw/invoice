import { Link } from "@inertiajs/react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useAppearance } from "@/hooks/use-appearance"

export default function AuthSimpleLayout({ children, title, description }) {
  const { appearance, updateAppearance } = useAppearance()

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base-200 px-3 sm:px-6 lg:px-8 py-6 sm:py-10 transition-colors duration-300">
      {/* Background animated shapes */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-5 sm:left-10 h-32 sm:h-40 w-32 sm:w-40 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 right-5 sm:right-10 h-48 sm:h-60 w-48 sm:w-60 rounded-full bg-secondary/20 blur-3xl"
      />

      {/* Card container responsif */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl rounded-2xl bg-base-100 shadow-2xl border border-base-300 p-5 sm:p-8 lg:p-10"
      >
        {/* Theme toggle (pojok kanan atas) */}
        <div className="absolute top-3 right-3">
          <button
            onClick={() =>
              updateAppearance(appearance === "light" ? "dark" : "light")
            }
            className="btn btn-ghost btn-sm p-2"
          >
            {appearance === "light" && <Sun size={18} />}
            {appearance === "dark" && <Moon size={18} />}
          </button>
        </div>

        {/* Logo + title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Link href={route("home")}>
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-md">
              <span className="text-white font-bold text-sm sm:text-lg">ACI</span>
            </div>
          </Link>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs sm:text-sm opacity-70">{description}</p>
          </div>
        </div>

        {/* Form content */}
        <div className="mt-6">{children}</div>
      </motion.div>
    </div>
  )
}
