"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Calendar, Bot, Sparkles, Clock, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomeClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

    const handleOAuthSignUp = async (provider: string) => {
        try {
            setIsLoading(true);
            setLoadingProvider(provider);
            await signIn(provider, { callbackUrl: "/" });
        } catch (error) {
            console.error("Authentication error:", error);
        } finally {
            setIsLoading(false);
            setLoadingProvider(null);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const buttonVariants = {
        rest: { scale: 1 },
        hover: {
            scale: 1.02,
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98 }
    };

    const iconVariants = {
        rest: { scale: 1, rotate: 0 },
        hover: { scale: 1.1, rotate: 5 },
        loading: {
            rotate: 360,
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const dotVariants = {
        bounce: {
            y: [0, -8, 0],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const shimmerVariants = {
        animate: {
            x: ["-100%", "100%"],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    // @ts-ignore
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -50, 20, 0],
                        scale: [1, 1.1, 0.9, 1]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, -30, 20, 0],
                        y: [0, 50, -20, 0],
                        scale: [1, 0.9, 1.1, 1]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
                <motion.div
                    className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                    animate={{
                        x: [0, 20, -30, 0],
                        y: [0, -20, 30, 0],
                        scale: [1, 1.05, 0.95, 1]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4
                    }}
                />
            </div>

            <div className="relative flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="w-full max-w-md space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header Section */}
                    <motion.div className="text-center" variants={itemVariants}>
                        <motion.div
                            className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            animate={{
                                boxShadow: [
                                    "0 10px 25px -5px rgba(99, 102, 241, 0.25)",
                                    "0 10px 25px -5px rgba(147, 51, 234, 0.25)",
                                    "0 10px 25px -5px rgba(99, 102, 241, 0.25)"
                                ]
                            }}
                            transition={{
                                boxShadow: { duration: 2, repeat: Infinity },
                                hover: { duration: 0.2 }
                            }}
                        >
                            <Bot className="h-8 w-8 text-white" />
                        </motion.div>

                        <motion.h1
                            className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            SchedBot
                        </motion.h1>

                        <motion.div
                            className="flex items-center justify-center mt-4 mb-6"
                            variants={itemVariants}
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles className="h-5 w-5 text-indigo-500 mr-2" />
                            </motion.div>
                            <p className="text-xl text-gray-600 font-medium">
                                AI-Powered Calendar Assistant
                            </p>
                            <motion.div
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            >
                                <Sparkles className="h-5 w-5 text-purple-500 ml-2" />
                            </motion.div>
                        </motion.div>

                        <motion.p
                            className="text-gray-500 max-w-sm mx-auto leading-relaxed"
                            variants={itemVariants}
                        >
                            Transform natural language into calendar events instantly.
                            Just tell me when, and I'll handle the rest.
                        </motion.p>
                    </motion.div>

                    {/* Features Preview */}
                    <motion.div
                        className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <motion.div
                                className="flex flex-col items-center space-y-2"
                                whileHover={{ y: -5 }}
                            >
                                <motion.div
                                    className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Calendar className="h-5 w-5 text-indigo-600" />
                                </motion.div>
                                <span className="text-sm text-gray-600 font-medium">Smart Scheduling</span>
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center space-y-2"
                                whileHover={{ y: -5 }}
                            >
                                <motion.div
                                    className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Zap className="h-5 w-5 text-purple-600" />
                                </motion.div>
                                <span className="text-sm text-gray-600 font-medium">Instant Events</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Authentication Buttons */}
                    <motion.div className="space-y-4" variants={itemVariants}>
                        <motion.button
                            onClick={() => handleOAuthSignUp("github")}
                            disabled={isLoading}
                            className="group relative flex w-full justify-center items-center rounded-xl border-0 bg-gray-900 py-4 px-6 text-sm font-semibold text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                            variants={buttonVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <AnimatePresence>
                                {loadingProvider === "github" && (
                                    <motion.div
                                        className="absolute inset-0 bg-gray-800 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="flex space-x-2">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-2 h-2 bg-white rounded-full"
                                                    variants={dotVariants}
                                                    animate="bounce"
                                                    transition={{ delay: i * 0.1 }}
                                                />
                                            ))}
                                        </div>
                                        <motion.div
                                            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            variants={shimmerVariants}
                                            animate="animate"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.svg
                                className="h-5 w-5 mr-3"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                variants={iconVariants}
                                animate={loadingProvider === "github" ? "loading" : "rest"}
                            >
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </motion.svg>
                            <motion.span
                                className="transition-all"
                                animate={{
                                    letterSpacing: loadingProvider === "github" ? "0.05em" : "0em"
                                }}
                            >
                                Continue with GitHub
                            </motion.span>
                        </motion.button>

                        <motion.button
                            onClick={() => handleOAuthSignUp("google")}
                            disabled={isLoading}
                            className="group relative flex w-full justify-center items-center rounded-xl border-2 border-gray-200 bg-white py-4 px-6 text-sm font-semibold text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                            variants={buttonVariants}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <AnimatePresence>
                                {loadingProvider === "google" && (
                                    <motion.div
                                        className="absolute inset-0 bg-gray-50 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="flex space-x-1">
                                            {[
                                                { color: "bg-blue-500", delay: 0 },
                                                { color: "bg-red-500", delay: 0.15 },
                                                { color: "bg-yellow-500", delay: 0.3 },
                                                { color: "bg-green-500", delay: 0.45 }
                                            ].map((dot, i) => (
                                                <motion.div
                                                    key={i}
                                                    className={`w-3 h-3 ${dot.color} rounded-full`}
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.7, 1, 0.7]
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        delay: dot.delay
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <motion.div
                                            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-gray-200/50 to-transparent"
                                            variants={shimmerVariants}
                                            animate="animate"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.svg
                                className="h-5 w-5 mr-3"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 488 512"
                                variants={iconVariants}
                                animate={loadingProvider === "google" ? "loading" : "rest"}
                            >
                                <path fill="#4285F4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </motion.svg>
                            <motion.span
                                className="transition-all"
                                animate={{
                                    letterSpacing: loadingProvider === "google" ? "0.05em" : "0em"
                                }}
                            >
                                Continue with Google
                            </motion.span>
                        </motion.button>
                    </motion.div>

                    {/* Footer */}
                    <motion.div className="text-center space-y-4" variants={itemVariants}>
                        <motion.div
                            className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        />
                        <motion.div
                            className="flex items-center justify-center text-xs text-gray-400 space-x-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <span>Powered by AI</span>
                            <motion.div
                                className="w-1 h-1 bg-gray-400 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span>Secured by OAuth</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}