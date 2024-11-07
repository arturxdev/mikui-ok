'use client'
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { Trash } from 'lucide-react';

export default function Verb() {
  const { userId } = useAuth();
  
  const [formData, setFormData] = useState({
    present: '',
    past: '',
    participle: '',
  });
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get('/api/words');
      setWords(response.data);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        <form onSubmit={handleSubmit} className="flex space-x-4 mb-6">
          <input
            type="text"
            name="present"
            placeholder="Present"
            value={formData.present}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="past"
            placeholder="Past"
            value={formData.past}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="participle"
            placeholder="Past Participle"
            value={formData.participle}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary">
            Save
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
