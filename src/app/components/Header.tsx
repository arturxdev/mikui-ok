import ThemeSelector from "./ThemeSelector"
import Topics from "./Topics"

const Header = () => {
  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <img src="/icon.png" alt="logo" className="w-12 rounded-full" />
        <a className="btn btn-ghost text-xl">Mikui</a>
      </div>
      <div className="flex-none">
        <Topics />
        <ThemeSelector />
      </div>
    </header>
  )
}
export default Header
