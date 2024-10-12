const version = 2
const baseArray = [
  { id: 1, checked: true, topic: "Passive voice" },
  { id: 2, checked: true, topic: "Reported speech" },
  { id: 3, checked: true, topic: "First conditional" },
  { id: 4, checked: true, topic: "Second conditional" },
  { id: 5, checked: true, topic: "Third conditional" },
  { id: 6, checked: true, topic: "Relative clauses" },
  { id: 7, checked: true, topic: "Verb to be" },
  { id: 7, checked: true, topic: "Simple present" },
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
