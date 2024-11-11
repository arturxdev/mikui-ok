'use client'
import React, { useState } from 'react';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';

export default function Practice() {
  const [formData, setFormData] = useState({ present: 'Go', past: '', participle: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your verification logic here
    alert('Verification logic goes here');
  };

  return (
    <div className="md:w-4/5 lg:w-3/4 mx-auto py-4 px-4 sm:px-0 flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex-grow lg:mt-24 mt-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Practice your vocabulary</h1>
        <p className="mb-6">Remember the other conjugations</p>
        <form onSubmit={handleSubmit} className="flex justify-center space-x-4 mb-6">
          <div>
            <label htmlFor="present" className="block text-sm font-medium text-gray-700">
              Present
            </label>
            <input
              type="text"
              name="present"
              id="present"
              value={formData.present}
              onChange={handleChange}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="past" className="block text-sm font-medium text-gray-700">
              Past
            </label>
            <input
              type="text"
              name="past"
              id="past"
              value={formData.past}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="participle" className="block text-sm font-medium text-gray-700">
              Participle
            </label>
            <input
              type="text"
              name="participle"
              id="participle"
              value={formData.participle}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </form>
        <button type="submit" className="btn btn-primary">
          Verify
        </button>
      </main>
      <Footer />
    </div>
  );
} 