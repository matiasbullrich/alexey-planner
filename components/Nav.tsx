import Link from "next/link";

const links = [
  ["/", "Today"],
  ["/map", "Course map"],
  ["/lanes", "Career lanes"],
  ["/plans", "Plans & goals"],
  ["/compare", "Compare"],
  ["/careers", "Internships & careers"],
  ["/masters", "4 or 5 years"],
  ["/code", "Code & handover"],
] as const;

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">Alexey<span>·</span>Rutgers</Link>
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="link">{label}</Link>
        ))}
      </div>
    </nav>
  );
}
