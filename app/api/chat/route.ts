import { NextRequest, NextResponse } from 'next/server';
import { openai, SYSTEM_PROMPT } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 
      "I'm sorry, I couldn't process that request. Please try again.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Something went wrong — please try again shortly.',
        reply: 'Something went wrong — please try again shortly.'
      },
      { status: 500 }
    );
  }
}