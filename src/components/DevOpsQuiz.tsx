"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const quizQuestions: QuizQuestion[] = [
  {
    question: "What does CI stand for in DevOps?",
    options: ["Continuous Integration", "Continuous Installation", "Code Integration", "Cloud Infrastructure"],
    correctAnswer: 0,
    explanation: "Continuous Integration is the practice of frequently merging code changes into a central repository."
  },
  {
    question: "Which tool is primarily used for containerization?",
    options: ["Jenkins", "Docker", "Ansible", "Terraform"],
    correctAnswer: 1,
    explanation: "Docker is the leading platform for developing, shipping, and running applications in containers."
  },
  {
    question: "What does IaC stand for?",
    options: ["Internet as Code", "Infrastructure as Code", "Integration as Code", "Interactive as Code"],
    correctAnswer: 1,
    explanation: "Infrastructure as Code manages and provision infrastructure through code rather than manual processes."
  },
  {
    question: "Which AWS service is a managed Kubernetes offering?",
    options: ["EC2", "EKS", "ECS", "S3"],
    correctAnswer: 1,
    explanation: "Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service to run Kubernetes on AWS."
  },
  {
    question: "What is the purpose of a reverse proxy like Nginx?",
    options: ["Store data", "Distribute traffic and SSL termination", "Run containers", "Monitor servers"],
    correctAnswer: 1,
    explanation: "Reverse proxies handle client requests, distribute traffic, SSL termination, and improve security and performance."
  }
];

export default function DevOpsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setQuizFinished(false);
  };

  return (
    <section id="quiz" className="bg-[#0a0a0a] text-white py-32 px-4 md:px-12 relative z-20 border-b border-white/5 scroll-mt-20">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-6 text-center">
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">Interactive</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">DevOps Quiz</h2>
          <p className="text-gray-400 text-lg md:text-xl font-light">
            Test your DevOps knowledge with this quick quiz!
          </p>
        </div>

        <div className="glass-card rounded-3xl border border-white/5 p-8 md:p-12">
          <AnimatePresence mode="wait">
            {quizFinished ? (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-8 text-center"
              >
                <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <Trophy className="w-16 h-16 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-2">Quiz Complete!</h3>
                  <p className="text-2xl text-indigo-400 font-mono">
                    Score: {score} / {quizQuestions.length}
                  </p>
                </div>
                <p className="text-gray-400">
                  {score === quizQuestions.length
                    ? "Perfect score! You're a DevOps pro!"
                    : score >= quizQuestions.length / 2
                    ? "Great job! You know your stuff!"
                    : "Keep learning! DevOps is a journey!"}
                </p>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Play Again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-mono">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm text-indigo-400 font-mono">
                    Score: {score}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-xl md:text-2xl font-semibold leading-relaxed">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={answered}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        answered
                          ? index === quizQuestions[currentQuestion].correctAnswer
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : index === selectedAnswer
                            ? "bg-red-500/10 border-red-500/30"
                            : "bg-white/[0.02] border-white/5 opacity-50"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-indigo-500/20 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono ${
                          answered
                            ? index === quizQuestions[currentQuestion].correctAnswer
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : index === selectedAnswer
                              ? "bg-red-500 border-red-500 text-white"
                              : "border-white/20 text-gray-500"
                            : "border-white/20 text-gray-400"
                        }`}>
                          {answered ? (
                            index === quizQuestions[currentQuestion].correctAnswer ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : index === selectedAnswer ? (
                              <XCircle className="w-3 h-3" />
                            ) : (
                              String.fromCharCode(65 + index)
                            )
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </span>
                        <span className="text-sm font-medium">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border ${
                      selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                        ? "bg-emerald-500/10 border-emerald-500/20"
                        : "bg-amber-500/10 border-amber-500/20"
                    }`}
                  >
                    <p className="text-sm text-gray-300">{quizQuestions[currentQuestion].explanation}</p>
                  </motion.div>
                )}

                {answered && (
                  <button
                    onClick={nextQuestion}
                    className="w-full md:w-auto px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all cursor-pointer"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
