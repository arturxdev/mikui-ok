"use client"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { fetchQuestion } from "./service/openai";
import { useEffect, useState } from "react";
import { getTopics } from "./service/localStorage";
export default function Home() {
  const [situation, setSituation] = useState({
    instruction: "",
    question: ""
  })
  useEffect(() => {
    const grammarRulesSaved = getTopics()
    const grammarRulesChecked = grammarRulesSaved.filter((rule: any) => rule.checked)
    const grammarRuleSelected = grammarRulesChecked[Math.floor(Math.random() * grammarRulesChecked.length)]
    console.log("Generate a random question", grammarRuleSelected.topic)

    fetchQuestion(grammarRuleSelected.topic).then(response => {
      setSituation(response.data)
    })
    console.log('effect')
  }, [])
  return (
    <div className="w-3/4 mx-auto py-4 flex flex-col justify-between min-h-screen">
      <div>
        <Header />
        <main className="mt-24">
          <p className="font-semibold text-center text-4xl mt-10">Practice your English grammar everyday</p>
          <p className=" mt-16">{situation.instruction} </p>
          <p className="font-semibold text-2xl">{situation.question} </p>
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
