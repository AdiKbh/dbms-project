"use client"

const stats = [
  { value: "50,000+", label: "Books Available" },
  { value: "10,000+", label: "Active Members" },
  { value: "1,500+", label: "Daily Transactions" },
  { value: "99.9%", label: "Uptime" },
]

export default function StatsSection() {
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold tracking-tight text-primary">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}