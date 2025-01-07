import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(null); // To manage which menu item is expanded
  const [collapsed, setCollapsed] = useState(false); // To manage the sidebar collapse/expand state

  const sidebarItems = [
    { name: "Statistike", path: "/home", icon: "📊", subItems: [] },
    { name: "Ombor", path: "/categories", icon: "📦", subItems: [] },
    { name: "Magazinlar", path: "/shops", icon: "🏪", subItems: [] },
    { name: "Hodimlar", path: "/employees", icon: "👥", subItems: [] },
    { name: "Tayyor Mahsulot", path: "/ready-product", icon: "🍽️", subItems: [] },
  ];

  const handleToggle = (index, e) => {
    e.stopPropagation(); // Prevent propagation so that it doesn't trigger when clicking on the link
    setExpanded(expanded === index ? null : index); // Toggle expanded menu item
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Toggle sidebar collapse state
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar collapse/expand button */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {collapsed ? '>' : '<'}
      </button>

      <ul className="sidebar_list">
        {sidebarItems.map((item, index) => (
          <li
            key={item.path}
            className={`sidebar_item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <div className="menu-item-header">
              {/* Item icon (Link with stopPropagation to prevent toggle) */}
              <Link to={item.path} className="menu-icon" onClick={(e) => e.stopPropagation()}>
                {item.icon}
              </Link>
              
              {/* If not collapsed, display the item name */}
              {!collapsed && (
                <Link to={item.path} className="menu-text">
                  {item.name}
                </Link>
              )}
              
              {/* If there are subItems, show expand/collapse icon */}
              {item.subItems.length > 0 && (
                <span onClick={(e) => handleToggle(index, e)}>
                  {expanded === index ? '-' : '+'}
                </span>
              )}
            </div>
            
            {/* Submenu rendering */}
            {expanded === index && item.subItems.length > 0 && (
              <ul className="sub-menu">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link to={subItem.path}>{subItem.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
