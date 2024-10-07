
const baseArray = [
  { id: 1, checked: true, topic: "Passive voice" },
  { id: 2, checked: true, topic: "Reported speech" },
  { id: 3, checked: true, topic: "First conditional" },
  { id: 4, checked: true, topic: "Second conditional" },
  { id: 5, checked: true, topic: "Third conditional" },
  { id: 6, checked: true, topic: "Relative clauses" },
  { id: 7, checked: true, topic: "Verb to be" },
]
export const getTopics = () => {
  if (typeof window !== 'undefined') {
    const storedArray = localStorage.getItem('grammarRules')
    return storedArray ? JSON.parse(storedArray) : baseArray;
  }
  return []
}
