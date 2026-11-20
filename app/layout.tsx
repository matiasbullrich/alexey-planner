import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Alexey · Rutgers planner",
  description: "Courses, prerequisites, plans, internships and deadlines.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <footer>Version 0.1 · Public Rutgers data plus planning notes · Personal records stay in your browser until the database is connected. <a href="/code">Code &amp; handover</a></footer>
      </body>
    </html>
  );
}
