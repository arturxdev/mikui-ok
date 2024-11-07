'use client'
import React, { useState, useEffect } from 'react';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import axios from 'axios';
import { Word } from 'app/entities/wordSchema';
import { LetterText } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
export default function Practice() {
  const [word, setWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState({ past: '', participle: '' });
  const [result, setResult] = useState('');
  const [countdown, setCountdown] = useState(3);
  const { userId } = useAuth();
  useEffect(() => {
    fetchRandomWord();
  }, []);

  const fetchRandomWord = async () => {
    try {
      
      const response = await axios.get(`/api/verb/random?userId=${userId}`);
      setWord(response.data);
      setUserInput({ past: '', participle: '' });
      setResult('');
      setCountdown(3);
    } catch (error) {
      console.error('Error fetching random word:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.past === word?.past && userInput.participle === word?.participle) {
      setResult('Correct! Next word in');
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            fetchRandomWord();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setResult('Try again!');
    }
  };

  return (
    <div className="md:w-4/5 lg:w-3/4 mx-auto py-4 px-4 sm:px-0 flex flex-col justify-between min-h-screen">
      <div>
        <Header />
        <main className="lg:mt-24 mt-10">
          <a href="/verb" className="btn btn-ghost">
            <LetterText />
            <span className="">Verbs</span>
          </a>
          {word ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Practice your vocabulary Word</h2>
              <p className="text-lg mb-4">Present: {word.present}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className='flex justify-center'>
                  <div className='m-2'>
                    <label htmlFor="past" className="block text-sm font-medium text-gray-700">
                      Past
                    </label>
                    <input
                      type="text"
                      name="past"
                      id="past"
                      value={userInput.past}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className='m-2'>
                    <label htmlFor="participle" className="block text-sm font-medium text-gray-700">
                      Participle
                    </label>
                    <input
                      type="text"
                      name="participle"
                      id="participle"
                      value={userInput.participle}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Check
                </button>
              </form>
              {result && <p className="mt-4 text-lg">{result} {countdown > 0 && countdown}</p>}
            </div>
          ) : (
            <div className="text-center mt-4">
              <p>Add verbs to start</p>
              <a
               href="/verb"
                className="btn btn-secondary mt-2"
              >
                Go to Verbs
              </a>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
} 