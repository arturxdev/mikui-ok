import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { response, question, instruction } = data;
    if (!response || !question || !instruction) return NextResponse.json({ error: "falta la respuesta, la pregunta o la instruccion" }, { status: 401 })
    const prompt = `
    is this excercie correct?
    Instruction:
    ${instruction}
    Question:
    ${question}
    Response: 
    ${response}
    if is correct say "correct" if is not say "incorrect" and give the corrected version of the response and tell my why is incorrect in 20 words or less ,be consice and clear.
    `;
    // la respuesta es correcta si tiene una grammatica correcta,la repsuesta esta relacionada con la situacion
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "system",
          "content": [
            {
              "type": "text",
              "text": prompt
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            }
          ]
        },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        "type": "text"
      },
    });
    console.log(completion.choices[0].message.content)
    return NextResponse.json({ data: completion.choices[0].message.content }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
