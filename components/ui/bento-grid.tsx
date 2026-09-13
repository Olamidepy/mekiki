import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRight as ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className?: string
  background?: ReactNode
  Icon?: React.ElementType
  description: string
  href?: string
  cta?: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-auto md:auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href = "#",
  cta = "Explore Setup",
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 lg:col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl",
      // light styles & dark styles
      "bg-white dark:bg-card [box-shadow:0_0_0_1px_rgba(0,0,0,.04),0_2px_4px_rgba(0,0,0,.04),0_12px_24px_rgba(0,0,0,.04)] border border-slate-100 dark:border-slate-800",
      // hover elevation
      "hover:[box-shadow:0_0_0_1px_rgba(41,82,255,0.12),0_8px_20px_rgba(0,0,0,.06),0_20px_36px_rgba(41,82,255,.05)]",
      // transform
      "transform-gpu transition-all duration-300",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {background}
    </div>

    <div className="p-5 sm:p-6 relative z-10 flex flex-col justify-between h-full">
      <div className="flex transform-gpu flex-col gap-2 transition-all duration-300 lg:group-hover:-translate-y-8">
        {Icon && (
          <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200 shadow-sm transition-all duration-300 ease-in-out group-hover:scale-95 group-hover:bg-[#2952FF] group-hover:text-white group-hover:border-[#2952FF]">
            <Icon className="h-5 w-5 transform-gpu" />
          </div>
        )}
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Mobile visible action */}
      <div
        className={cn(
          "flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 lg:hidden mt-4"
        )}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className="p-0 text-[#2952FF] dark:text-[#5c80ff] font-semibold"
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-1.5 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    {/* Desktop slide-up action bar */}
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex z-20"
      )}
    >
      <Button
        variant="link"
        asChild
        size="sm"
        className="pointer-events-auto p-0 text-[#2952FF] dark:text-[#5c80ff] font-semibold hover:text-[#1f3fd6]"
      >
        <a href={href} className="inline-flex items-center">
          {cta}
          <ArrowRightIcon className="ms-1.5 h-4 w-4 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </Button>
    </div>

    {/* Subtle hover overlay */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-slate-900/[0.02] dark:group-hover:bg-white/[0.02]" />
  </div>
)

export { BentoCard, BentoGrid }
