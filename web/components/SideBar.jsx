import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate


function SideButton({name, icon, href = "#", isOpen = false}){
    const spanStyle = {
        opacity: isOpen ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
        whiteSpace: "nowrap",
        width: 0, //Para não afetar o layout
    }
    return (
    <Link to={href} className="d-flex align-items-center p-2 rounded text-decoration-none text-dark sidebar-button w-100 border-10 border-bottom }">
        <i className={`bi bi-${icon} me-2 fs-1`} />
        <span style={spanStyle} className="sidebar-button-text fw-bold">{name}</span>
    </Link>
    );
}


function SideBar() {
    const [isHovered, setIsHovered] = useState(false);
    const sidebarWidth = isHovered ? "30vw" : "5vw"; // Largura do sidebar

    return (
      <aside
        id="sidebar"
        className="p-2 bg-light"
        style={{
          height: "100vh",
          width: sidebarWidth,
          transition: "width 0.4s ease-in-out",
          borderRight: "1px solid var(--bs-gray-300)",
          overflow: "hidden",
          minWidth: "min-content",
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SideButton
          name="Home"
          icon="house"
          href="/"
          isOpen={isHovered}
        />
        <SideButton
          name="Passageiros"
          icon="people"
          href="passengers"
          isOpen={isHovered}
        />
        <SideButton
          name="Onibus"
          icon="bus-front-fill"
          href="buses"
          isOpen={isHovered}
        />
        <SideButton
          name="Rotas"
          icon="signpost-split-fill"
          href="routes"
          isOpen={isHovered}
        />
        <SideButton
          name="Pontos"
          icon="geo-alt-fill"
          href="points"
          isOpen={isHovered}
        />
        <SideButton
          name="Relatorios"
          icon="list-task"
          href="reports"
          isOpen={isHovered}
        />
        <SideButton
          name="Configurações"
          icon="gear-fill"
          href="settings"
          isOpen={isHovered}
        />
      </aside>
    );
}


export default SideBar