'use client'
import React, { useState, useEffect } from 'react';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { Trash } from 'lucide-react';
import { fetchConjugations } from '../../service/openai';

export default function Verb() {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    present: '',
    past: '',
    participle: '',
  });
  const [words, setWords] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get(`/api/words?userId=${userId}`);
      setWords(response.data);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || '' }));

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setIsLoading(true);
    setTypingTimeout(
      setTimeout(() => {
        if (name === 'present') {
          fetchConjugations(value)
            .then((conjugations) => {
              console.log(conjugations)
              setFormData((prev) => ({
                ...prev,
                past: conjugations.data.past,
                participle: conjugations.data.participle,
              }));
            })
            .catch((error) => console.error('Error fetching conjugations:', error))
            .finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
        }
      }, 1000)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/words', { userId, ...formData });
      setFormData({ present: '', past: '', participle: '' });
      fetchWords(); // Refresh the list
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete('/api/words', { data: { id } });
      fetchWords(); // Refresh the list
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };

  return (
    <div className="md:w-4/5 lg:w-3/4 mx-auto py-4 px-4 sm:px-0 flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-grow">
        <h1 className="text-3xl font-bold text-center mb-6">Your Vocabulary</h1>
        <span className=' text-sm'>Write the verb in present tense, and we'll complete the conjugations.</span>
        <form onSubmit={handleSubmit} className="flex space-x-4 mb-8 mt-2">
          <input
            type="text"
            name="present"
            placeholder="Present"
            value={formData.present || ''}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="past"
            placeholder="Past"
            value={formData.past || ''}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="participle"
            placeholder="Past Participle"
            value={formData.participle || ''}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className={`btn btn-primary`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Save
              </span>
            ) : (
              'Save'
            )}
          </button>
        </form>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Present</th>
              <th>Past</th>
              <th>Participle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word: any) => (
              <tr key={word._id}>
                <td>{word.present}</td>
                <td>{word.past}</td>
                <td>{word.participle}</td>
                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(word._id)}
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
} 
