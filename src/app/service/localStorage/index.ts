const version = 3
const baseArray = [
  { id: 1, checked: true, topic: "Passive voice" },
  { id: 2, checked: true, topic: "Reported speech" },
  { id: 3, checked: true, topic: "First conditional" },
  { id: 4, checked: true, topic: "Second conditional" },
  { id: 5, checked: true, topic: "Third conditional" },
  { id: 6, checked: true, topic: "Relative clauses" },
  { id: 7, checked: true, topic: "Verb to be" },
  { id: 8, checked: true, topic: "Present simple" },
  { id: 9, checked: true, topic: "Present perfect" },
  { id: 10, checked: true, topic: "Present continuous" },
  { id: 11, checked: true, topic: "Present perfect continuous" },
  { id: 12, checked: true, topic: "Past simple" },
  { id: 13, checked: true, topic: "Past continuous" },
  { id: 14, checked: true, topic: "Past perfect" },
  { id: 15, checked: true, topic: "Past perfect continuous" },
  { id: 16, checked: true, topic: "Future simple" },
  { id: 17, checked: true, topic: "Future continuous" },
  { id: 18, checked: true, topic: "Future perfect" },
  { id: 19, checked: true, topic: "Future perfect continuous" },
]
export const getTopics = () => {
  if (typeof window !== 'undefined') {
    const local = JSON.parse(localStorage.getItem('grammarRules') ?? 'null')
    const localVersion = JSON.parse(localStorage.getItem('version') ?? 'null')
    if (localVersion !== version || !local) {
      localStorage.setItem('grammarRules', JSON.stringify(baseArray))
      localStorage.setItem('version', JSON.stringify(version))
    }
    if (!local) {
      localStorage.setItem('grammarRules', JSON.stringify(baseArray))
    }
    return JSON.parse(localStorage.getItem('grammarRules')!)
  }
  return []
}
