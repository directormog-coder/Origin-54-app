"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
      padding: "48px",
      background: "#FAF3E8",
    }}>
      <div style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "80px",
        color: "#C8922A",
        lineHeight: 1,
      }}>
        OOPS
      </div>
      <h2 style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "24px",
        color: "#2C3E50",
        fontWeight: 400,
        fontStyle: "italic",
      }}>
        Something went wrong
      </h2>
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontSize: "16px",
        color: "rgba(44,62,80,0.6)",
        textAlign: "center",
        maxWidth: "400px",
      }}>
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "14px",
          letterSpacing: "0.2em",
          background: "#2C3E50",
          color: "#FAF3E8",
          border: "none",
          padding: "14px 36px",
          cursor: "pointer",
        }}
      >
        TRY AGAIN
      </button>
    </div>
  )
}

