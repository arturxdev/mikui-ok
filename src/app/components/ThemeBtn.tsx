import { Palette } from "lucide-react";

export default function ThemeSwap({ handleOnClick, }: { handleOnClick?: (e?: any) => void; }) {
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost m-1">
          <Palette size={16} />Theme
        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li onClick={handleOnClick}><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" /></li>
          <li onClick={handleOnClick}><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="light" /></li>
          <li onClick={handleOnClick}><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro" /></li>
          <li onClick={handleOnClick}><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Synthwave" value="synthwave" /></li>
          <li onClick={handleOnClick}><input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Corporate" value="corporate" /></li>
        </ul>
      </div>
    </>
  );
}
