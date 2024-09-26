"use client"
import Header from "./components/Header";
import Footer from "./components/Footer";
export default function Home() {

  return (
    <div className="w-3/4 mx-auto py-4 flex flex-col justify-between min-h-screen">
      <div>
        <Header />
        <main className="mt-24">
          <p className="font-semibold text-center text-4xl mt-10">Practice your English grammar everyday</p>
          <p className=" mt-16">Complete the sentences using the first conditional (if + present simple, will + base form). </p>
          <p className="font-semibold text-2xl">If my dog barks, I _______ (go) to see what’s wrong. </p>
          <div className=" mt-8">
            <input type="text" placeholder="Type here" className="input input-bordered w-full" />
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary mx-auto">Verify</button>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
