import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export const dynamic = 'force-dynamic'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function GET(request: NextRequest) {
  const grammarRule = request.nextUrl.searchParams.get('grammarRule')
  if (!grammarRule) return NextResponse.json({ error: "falta la grammar rule" }, { status: 401 });
  try {
    const topics = ["music", "sports", "food", "movies", "news", "books", "dogs", "cats", "love"]
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const prompt = `
    You are a helpful English teacher, your work is creating exercises. For the exercise they only need to content the instruction and one question.
    Here there are an example of exercises.

    Fill in the blanks with the correct form of the verb in parentheses using the present perfect
    I _______ (never/see) a whale in my life.

    Change the following sentences to present perfect 
    She finished the book. →  She ________.

    Choose the correct option
    They _______ (have/has) been to London many times.

    Answer the following questions using the present perfect
    Have you ever traveled abroad? (yes) → ________.
    `
    //openai
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
              "text": `Give one exercise to practice ${grammarRule} about ${topic}`
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
        "type": "json_schema",
        "json_schema": {
          "name": "paper_metadata",
          "strict": true,
          "schema": {
            "type": "object",
            "properties": {
              "instruction": {
                "type": "string"
              },
              "question": {
                "type": "string"
              }
            },
            "required": [
              "instruction",
              "question"
            ],
            "additionalProperties": false
          }
        }
      },
    });
    const data = JSON.parse(completion.choices[0].message.content ?? '{}')
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

