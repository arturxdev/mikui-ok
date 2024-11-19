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
import { BookText, LetterText, LogIn, Sparkle } from "lucide-react"
import Link from "next/link"

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
          <Link href="/" className="btn btn-ghost">
            <Sparkle size={16} />
            <span className="">Grammar</span>
          </Link>
        </div>
        <div className="dropdown dropdown-end mr-2">
          <Link href="/verb" className="btn btn-ghost">
            <LetterText size={16} />
            <span className="">Verbs</span>
          </Link>
        </div>
        <div className="dropdown dropdown-end mr-2">
          <Link href="/library" className="btn btn-ghost">
            <BookText size={16} />
            <span className="">Library</span>
          </Link>
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
