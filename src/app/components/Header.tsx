"use client"
import Image from "next/image"
import ThemeSelector from "./ThemeSelector"
import Topics from "./Topics"
import { getTopics } from "../service/localStorage"

const Header = () => {
  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Image
          aria-hidden
          className="w-12 rounded-full"
          src="/icon.png"
          alt="Window icon"
          width={48}
          height={48}
        />
        <a className="btn btn-ghost text-xl">Mikui</a>
      </div>
      <div className="flex-none">
        <Topics data={getTopics()} />
        <ThemeSelector />
      </div>
    </header>
  )
}
export default Header
