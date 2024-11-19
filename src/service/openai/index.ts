import axios from "axios";

export const fetchQuestion = async (grammarRule: string) => {
  try {
    const response = await axios.get(`/api/question?grammarRule=${grammarRule.toLowerCase()}`)
    return {
      status: true,
      data: response.data.data
    }
  } catch (err) {
    console.log('fetchQuestion', err)
    return {
      status: false,
      err: 'Error fetching question'
    }
  }
};

export const fetchVerifyQuestion = async (payload: any) => {
  try {
    const res = await axios.post('/api/response', {
      response: payload.answer,
      question: payload.question,
      instruction: payload.instruction,
    });
    const data = res.data.data
    return {
      status: true,
      data
    }
  } catch (err) {
    console.log('fetchQuestion', err)
    return {
      status: false,
      err: 'Error fetching question'
    }
  }

}

export const fetchConjugations = async (verb: string) => {
  try {
    const response = await axios.post('/api/verb', { verb });
    return response.data;
  } catch (error) {
    console.error('Error fetching conjugations:', error);
    throw error;
  }
};


