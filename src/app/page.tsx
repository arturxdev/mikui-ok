"use client"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { fetchQuestion, fetchVerifyQuestion } from "./service/openai";
import { useEffect, useState } from "react";
import { getTopics } from "./service/localStorage";
import { SubmitHandler, useForm } from "react-hook-form";
export default function Home() {
  const [situation, setSituation] = useState({
    instruction: "",
    question: "",
    grammarRule: ""
  })
  const [response, setResponse] = useState({
    show: false,
    isCorrect: "",
    explain: "",
    correctedVersion: ""
  })
  useEffect(() => {
    handleFecthQuestion()
    console.log('effect')
  }, [])

  const handleFecthQuestion = () => {
    const grammarRulesSaved = getTopics()
    const grammarRulesChecked = grammarRulesSaved.filter((rule: any) => rule.checked)
    const grammarRuleSelected = grammarRulesChecked[Math.floor(Math.random() * grammarRulesChecked.length)]
    console.log("Generate a random question", grammarRuleSelected.topic)
    fetchQuestion(grammarRuleSelected.topic).then(response => {
      setSituation({ ...response.data, grammarRule: grammarRuleSelected.topic })
      setValue("answer", response.data.question)
    })
  }

  type Inputs = {
    answer: string
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async (params) => {
    console.log("send to verify")
    const payload = {
      answer: params.answer,
      question: situation.question,
      instruction: situation.instruction,
    }
    const { data } = await fetchVerifyQuestion(payload)

    setResponse({ ...data, show: true })
    console.log(response)
  }
  const handleNextQuestion = () => {
    setResponse({ show: false, isCorrect: "", explain: "", correctedVersion: "" })
    handleFecthQuestion()
    setValue("answer", "")
  }
  return (
    <div className="md:w-4/5 lg:w-3/4  mx-auto py-4 px-4 sm:px-0 flex flex-col justify-between min-h-screen">
      <div>
        <Header />
        <main className="lg:mt-24 mt-10">
          <p className="font-semibold text-center text-4xl mt-10">Practice your English grammar everyday</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-center mt-16 text-xl">{situation.instruction} </p>
            {/* <p className="text-center font-semibold text-2xl">{situation.question} </p> */}
            <div className=" mt-8">
              <input type="text" {...register("answer")} placeholder="Type here" className="input input-bordered w-full" />
            </div>
            {response.show ? (
              <div className="mt-4">
                <p className="font-semibold text-xl">{response.isCorrect ? "✅ Correct" : "❌ Wrong"}</p>
                <p className="text-lg">{!response.isCorrect ? `Correct way: ${response.correctedVersion}` : null}</p>
                <p className="text-lg">{!response.isCorrect ? `Why: ${response.explain}` : null}</p>
              </div>
            ) : null}
            {!response.show ? (
              <div className="text-center mt-4">
                <a className="link" target="_blank" href={`/learn/${situation.grammarRule.toLowerCase().split(" ").join("-")}`}>Do you wanna a clue?</a>
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary mx-auto">Verify</button>
                </div>
              </div>
            ) : null}
            {errors.answer && <span>This field is required</span>}
          </form>

          {response.show ? (
            <div className="text-center mt-4">
              <button onClick={handleNextQuestion} className="btn btn-primary mx-auto">Try again</button>
            </div>
          ) : null}
        </main>
      </div>
      <Footer />
    </div>
  );
}
