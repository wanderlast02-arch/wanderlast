"use client";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav
      style={{
        padding: "12px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontSize: "12px",
        color: "var(--text-secondary)",
      }}
      aria-label="Breadcrumb"
    >
      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        <li>
          <a href="/" style={{ color: "var(--primary)", textDecoration: "none" }}>
            Home
          </a>
        </li>

        {items.map((item, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: "var(--text-secondary)" }}>›</span>
            {item.href ? (
              <a href={item.href} style={{ color: "var(--primary)", textDecoration: "none" }}>
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
