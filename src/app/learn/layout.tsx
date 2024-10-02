import Header from "../components/Header";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:w-4/5 lg:w-3/4  mx-auto py-4 px-4 sm:px-0">
      <Header />
      <div className="prose mt-10">
        {children}
      </div>
    </div>
  )
}
