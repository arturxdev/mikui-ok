"use client"
import { useEffect, useState } from "react";

const Topics = ({ data }: any) => {
  const [grammarRules, setGrammarRules] = useState(data)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('grammarRules', JSON.stringify(grammarRules));
    }
  }, [grammarRules])

  const handleCheckbox = (event: any, id: any) => {
    setGrammarRules((prevRules: any) =>
      prevRules.map((rule: any) =>
        rule.id === id ? { ...rule, checked: event.target.checked } : rule
      )
    );
  }
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
          </svg>
        </label>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <p className="text-lg font-semibold mb-4">Grammar rules</p>
          {grammarRules.map((item: any) => (
            <div key={item.id} className="flex mb-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(event: any) => handleCheckbox(event, item.id)}
                className="checkbox checkbox-sm mr-2" />
              <span>{item.topic}</span>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Topics
