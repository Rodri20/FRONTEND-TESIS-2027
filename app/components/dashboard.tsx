"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Icon from "./dashboard-icon";
import { navigation } from "../lib/navigation";
export default function Dashboard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const current =
    navigation.find((item) => item.href === pathname) ?? navigation[0];
  const section = current.label;
  const sections = navigation;
  return (
    <div className="workspace">
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Faultwise inicio">
          <span className="brand-symbol">◈</span> FAULTWISE
        </Link>
        <p className="brand-caption">PREDICTIVE CI/CD</p>
        <div className="nav-label">ESPACIO DE TRABAJO</div>
        <nav aria-label="Navegación principal">
          {sections.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${section === item.label ? "active" : ""}`}
              aria-current={section === item.label ? "page" : undefined}
            >
              <Icon type={index} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="project-info">
          <span>TESIS 2027</span>
          <p>Next.js · Spring Boot</p>
        </div>
        <div className="profile">
          <span className="avatar">RM</span>
          <div>
            <strong>Administrador</strong>
            <small>Entorno de diseño</small>
          </div>
          <span className="online-dot" />
        </div>
      </aside>
      <a href="#main-content" className="skip-link">
        Ir al contenido principal
      </a>
      <main id="main-content">
        <header className="page-header">
          <div>
            <div className="eyebrow">WORKSPACE / {section.toUpperCase()}</div>
            <h1>{current.title}</h1>
            <p>{current.description}</p>
          </div>
          <span className="demo-badge">
            <span /> DEMO · DATOS SIMULADOS
          </span>
        </header>
        {children}
        <footer>
          FAULTWISE <span>·</span> Inteligencia para cada ejecución{" "}
          <span className="footer-version">
            Prototipo de investigación · v0.1
          </span>
        </footer>
      </main>
    </div>
  );
}
