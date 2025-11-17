'use client'

interface HeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function Header({ title, description, action }: HeaderProps) {
  return (
    <header
      className="px-8 py-6 border-b"
      style={{
        background: 'var(--white)',
        borderColor: 'rgba(59, 90, 125, 0.1)',
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-3xl font-bold mb-1"
            style={{
              fontFamily: 'var(--font-playfair)',
              color: 'var(--text-dark)',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                color: 'var(--text-gray)',
                fontSize: '0.95rem',
              }}
            >
              {description}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </header>
  )
}
