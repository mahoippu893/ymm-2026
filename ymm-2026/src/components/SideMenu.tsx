import { NavLink } from 'react-router-dom'
import { PAGE_MENU_ITEMS } from '../config/pageMenu'

function tooltipId(roman: string) {
  return `side-menu-tooltip-${roman}`
}

export default function SideMenu() {
  return (
    <nav className="side-menu" aria-label="ページメニュー">
      <ul className="side-menu-list">
        {PAGE_MENU_ITEMS.map((item) => {
          const id = tooltipId(item.roman)

          return (
            <li key={item.roman} className="side-menu-item">
              {item.enabled ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `side-menu-link${isActive ? ' is-active' : ''}`
                  }
                  aria-describedby={id}
                >
                  <span className="side-menu-roman">{item.roman}</span>
                </NavLink>
              ) : (
                <span
                  className="side-menu-link is-disabled"
                  aria-disabled="true"
                  aria-describedby={id}
                >
                  <span className="side-menu-roman">{item.roman}</span>
                </span>
              )}
              <span id={id} role="tooltip" className="side-menu-tooltip">
                {item.label}
              </span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
