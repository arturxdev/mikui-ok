import { Gift, Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      {/* <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/learn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="https://nextjs.org/icons/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        Learn
      </a> */}
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://mikui.canny.io/feature-requests"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Gift />
        Request & Vote on features
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://x.com/arturoxdev"
        target="_blank"
        rel="noopener noreferrer"
      >Made with
        <Heart size={16} />
        by @arturoxdev
      </a>
    </footer>
  )
}
export default Footer
