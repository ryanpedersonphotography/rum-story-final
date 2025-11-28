import '@/styles/page-shell.css'

interface HomePageShellProps {
  children: React.ReactNode
}

export function HomePageShell({ children }: HomePageShellProps) {
  return (
    <div className="page-shell">
      <div className="page-shell__ghost" aria-hidden="true" />
      <main className="page-shell__content">
        {children}
      </main>
    </div>
  )
}
