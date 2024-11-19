import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export const dynamic = 'force-dynamic'
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const { verb } = await request.json();

    if (!verb) {
      return NextResponse.json({ error: 'Verb is required' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": "I will send you a verb, and you need to give the conjugation of that word"
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": `Give the conjugation of: ${verb}`
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
          "name": "verbs_autocomplete",
          "strict": true,
          "schema": {
            "type": "object",
            "properties": {
              "present": {
                "type": "string"
              },
              "past": {
                "type": "string"
              },
              "participle": {
                "type": "string"
              }
            },
            "required": [
              "present",
              "past",
              "participle"
            ],
            "additionalProperties": false
          }
        }
      },
    });

    const data = JSON.parse(response.choices[0].message.content ?? '{}')
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching conjugations:', error);
    return NextResponse.json({ error: 'Failed to fetch conjugations' }, { status: 500 });
  }
} 