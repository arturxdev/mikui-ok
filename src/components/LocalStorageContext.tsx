"use client"
import { createContext, useEffect, useState } from "react";

const version = 4
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

const getTopics = () => {
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
    return [baseArray]
}
const getDefaultTheme = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("theme") ?? 'light'
    }
    return 'light'
}

interface LocalContextType {
    theme?: string;
    topics?: any
    changeTheme?: (nextTheme?: string) => void;
    changeTopic?: (checked: boolean, id: any) => void;
}

export const LocalContext = createContext<LocalContextType>({});

export const LocalProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<string>(() => getDefaultTheme());
    const [topics, setTopics] = useState<any>(() => getTopics());

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('grammarRules', JSON.stringify(topics));
        }
    }, [topics])

    const changeTopic = (checked: boolean, id: any) => {
        setTopics((prevRules: any) =>
            prevRules.map((rule: any) =>
                rule.id === id ? { ...rule, checked } : rule
            )
        );
        return
    }
    const changeTheme = (event?: any) => {
        const nextTheme: string | null = event.target.value || null;
        if (nextTheme) {
            setTheme(nextTheme);
        } else {
            setTheme((prev) => (prev === "light" ? "dark" : "light"));
        }
    };
    return (
        <LocalContext.Provider value={{ theme, changeTheme, topics, changeTopic }}>
            {children}
        </LocalContext.Provider>
    );
}
