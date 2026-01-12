'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './mcq.module.css';

const questions = [
    {
        id: 1,
        question: 'What is the value of π (pi) approximately?',
        options: ['3.14', '2.71', '1.61', '4.20'],
        correct: 0,
        explanation: 'π (pi) is approximately 3.14159, commonly rounded to 3.14.',
    },
    {
        id: 2,
        question: 'Which of the following is a prime number?',
        options: ['15', '21', '23', '27'],
        correct: 2,
        explanation: '23 is a prime number as it is only divisible by 1 and itself.',
    },
    {
        id: 3,
        question: 'What is the square root of 144?',
        options: ['10', '11', '12', '13'],
        correct: 2,
        explanation: 'The square root of 144 is 12 because 12 × 12 = 144.',
    },
];

export default function MCQPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const handleAnswerSelect = (index: number) => {
        if (!showExplanation) {
            setSelectedAnswer(index);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            setShowExplanation(true);
            if (selectedAnswer === question.correct && !answeredQuestions.includes(currentQuestion)) {
                setScore(score + 1);
                setAnsweredQuestions([...answeredQuestions, currentQuestion]);
            }
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
    };

    return (
        <div className={styles.mcqPage}>
            {/* Progress Bar */}
            <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
            </div>

            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <Link href="/" className={styles.backBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back
                    </Link>
                    <div className={styles.examInfo}>
                        <h1 className={styles.examTitle}>10th Maths MCQ Test</h1>
                        <p className={styles.examMeta}>Chapter 1: Number System</p>
                    </div>
                    <div className={styles.timer}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                        </svg>
                        <span>15:30</span>
                    </div>
                </div>

                {/* Question Card */}
                <div className={styles.questionCard}>
                    <div className={styles.questionHeader}>
                        <span className={styles.questionNumber}>Question {currentQuestion + 1} of {questions.length}</span>
                        <span className={styles.scoreDisplay}>Score: {score}/{questions.length}</span>
                    </div>

                    <h2 className={styles.question}>{question.question}</h2>

                    <div className={styles.options}>
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                className={`${styles.option} ${selectedAnswer === index ? styles.selected : ''
                                    } ${showExplanation && index === question.correct ? styles.correct : ''
                                    } ${showExplanation && selectedAnswer === index && index !== question.correct ? styles.incorrect : ''
                                    }`}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={showExplanation}
                            >
                                <span className={styles.optionLabel}>{String.fromCharCode(65 + index)}</span>
                                <span className={styles.optionText}>{option}</span>
                                {showExplanation && index === question.correct && (
                                    <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                )}
                                {showExplanation && selectedAnswer === index && index !== question.correct && (
                                    <svg className={styles.crossIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Explanation Panel */}
                    {showExplanation && (
                        <div className={styles.explanation}>
                            <div className={styles.explanationHeader}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 16v-4M12 8h.01" />
                                </svg>
                                <span>Explanation</span>
                            </div>
                            <p>{question.explanation}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className={styles.actions}>
                        <button
                            className={styles.navBtn}
                            onClick={handlePrevious}
                            disabled={currentQuestion === 0}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                            Previous
                        </button>

                        {!showExplanation ? (
                            <button
                                className={styles.submitBtn}
                                onClick={handleSubmit}
                                disabled={selectedAnswer === null}
                            >
                                Submit Answer
                            </button>
                        ) : (
                            <button
                                className={styles.nextBtn}
                                onClick={handleNext}
                                disabled={currentQuestion === questions.length - 1}
                            >
                                Next Question
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Question Navigator */}
                <div className={styles.navigator}>
                    <h3 className={styles.navigatorTitle}>Question Navigator</h3>
                    <div className={styles.questionGrid}>
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.navItem} ${currentQuestion === index ? styles.active : ''
                                    } ${answeredQuestions.includes(index) ? styles.answered : ''
                                    }`}
                                onClick={() => {
                                    setCurrentQuestion(index);
                                    setSelectedAnswer(null);
                                    setShowExplanation(false);
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
