"use client"
import { Menu } from "lucide-react";
import { useContext } from "react";
import { LocalContext } from "./LocalStorageContext";

const Topics = () => {
  const { topics, changeTopic } = useContext(LocalContext);
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
          <Menu size={16} /> Settings
        </label>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <p className="text-lg font-semibold mb-4">Grammar rules</p>
          {topics.map((item: any) => (
            <div key={item.id} className="flex mb-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(event: any) => changeTopic!(event.target.checked, item.id)}
                className="checkbox checkbox-sm mr-2" />
              <span>{item.topic}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Topics
