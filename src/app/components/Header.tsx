"use client"
import Image from "next/image"
import ThemeSelector from "./ThemeSelector"
import Topics from "./Topics"

const baseArray = [
  { id: 1, checked: true, topic: "Passive voice" },
  { id: 2, checked: true, topic: "Reported speech" },
  { id: 3, checked: true, topic: "First conditional" },
  { id: 4, checked: true, topic: "Second conditional" },
  { id: 5, checked: true, topic: "Third conditional" },
  { id: 6, checked: true, topic: "Relative clauses" },
]
const getTopics = () => {
  console.log("getTopics")
  if (typeof window !== 'undefined') {
    const storedArray = localStorage.getItem('grammarRules')
    return storedArray ? JSON.parse(storedArray) : baseArray;
  }
  return []
}
const Header = () => {
  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Image
          aria-hidden
          className="w-12 rounded-full"
          src="/icon.png"
          alt="Window icon"
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
