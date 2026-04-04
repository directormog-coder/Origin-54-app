export default function Loading() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
      background: "#FAF3E8",
    }}>
      {/* Animated gold ring */}
      <div style={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        border: "2px solid rgba(200,146,42,0.2)",
        borderTopColor: "#C8922A",
        animation: "spin 0.9s linear infinite",
      }} />

      <div style={{
        fontFamily: "var(--font-bebas)",
        fontSize: "13px",
        letterSpacing: "0.3em",
        color: "#C8922A",
      }}>
        LOADING
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

