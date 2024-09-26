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
    const res = await axios.post('/api/ask', {
      response: payload.answer,
      question: payload.question,
      instruction: payload.instruction,
      grammarRule: payload.topic
    });
    const data = JSON.parse(res.data.data)
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


