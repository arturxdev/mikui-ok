"use client"
import Image from "next/image"
import Topics from "./Topics"
import { getTopics } from "../service/localStorage"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import ThemeSwap from "./ThemeBtn"
import { ThemeContext } from "./ThemeContext"
import { useContext } from "react"
import { LetterText, LogIn, Sparkle } from "lucide-react"

const Header = () => {
  const { changeTheme } = useContext(ThemeContext);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="flex items-center">
          <Image
            aria-hidden
            className="w-12 rounded-full"
            src="/icon.png"
            alt="Window icon"
            width={48}
            height={48}
          />
          <span className="text-lg font-semibold">Mikui</span>
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end mr-2">
          <a href="/" className="btn btn-ghost">
          <Sparkle />
            <span className="">Grammar</span>
          </a>
        </div>
        <div className="dropdown dropdown-end mr-2">
          <a href="/verb/practice" className="btn btn-ghost">
            <LetterText />
            <span className="">Verbs</span>
          </a>
        </div>
        <div className="dropdown dropdown-end">
          <ThemeSwap handleOnClick={changeTheme} />
        </div>
        <div className="dropdown dropdown-end">
          <Topics data={getTopics()} />
        </div>
        <div className="dropdown dropdown-end">
          <SignedOut>
            <SignInButton>
              <button className="btn btn-ghost"><LogIn size={16} />Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  )
}
export default Header
