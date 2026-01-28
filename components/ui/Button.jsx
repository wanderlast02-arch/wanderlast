export default function Button({children}) {
  return <button style={{
    padding:'10px 20px',
    background:'var(--primary)',
    color:'white',
    borderRadius:'6px'
  }}>{children}</button>
}