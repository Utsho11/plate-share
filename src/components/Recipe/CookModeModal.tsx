"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Sun,
  ChefHat,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface InstructionStep {
  step: string;
}

interface CookModeModalProps {
  title: string;
  instructions: InstructionStep[];
  onClose: () => void;
}

interface WakeLockSentinel {
  release: () => Promise<void>;
}

export default function CookModeModal({
  title,
  instructions = [],
  onClose,
}: CookModeModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(180); // 3-minute default step timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Screen Wake Lock API activation
  useEffect(() => {
    async function requestWakeLock() {
      try {
        const nav = navigator as unknown as { wakeLock?: { request: (type: string) => Promise<WakeLockSentinel> } };
        if (nav.wakeLock) {
          wakeLockRef.current = await nav.wakeLock.request("screen");
          setWakeLockActive(true);
        }
      } catch (err) {
        console.warn("Screen Wake Lock API error:", err);
      }
    }

    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, []);

  // Step Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const totalSteps = instructions.length;
  const progressPercent = Math.round(((currentStep + 1) / (totalSteps || 1)) * 100);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setTimerSeconds(180);
      setIsTimerRunning(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setTimerSeconds(180);
      setIsTimerRunning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 text-white flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-600 rounded-xl">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold truncate max-w-xs sm:max-w-md">{title}</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Sun className="w-3.5 h-3.5" />
                {wakeLockActive ? "Screen Awake Active" : "Cook Mode Enabled"}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white transition"
          aria-label="Exit Cook Mode"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden my-4">
        <div
          className="bg-gradient-to-r from-orange-500 to-amber-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Center Step View */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-3xl mx-auto w-full text-center py-6 px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 mb-6">
          Step {currentStep + 1}
        </span>

        <p className="text-2xl sm:text-4xl font-semibold leading-relaxed sm:leading-relaxed text-gray-100 max-w-2xl">
          {instructions[currentStep]?.step || "Follow step instructions."}
        </p>

        {/* Step Timer Widget */}
        <div className="mt-8 p-4 bg-gray-900/80 border border-gray-800 rounded-2xl flex items-center gap-4">
          <span className="text-2xl font-mono font-bold text-orange-400 min-w-[70px]">
            {formatTime(timerSeconds)}
          </span>

          <Button
            size="sm"
            onClick={() => setIsTimerRunning((prev) => !prev)}
            className={isTimerRunning ? "bg-amber-600 hover:bg-amber-700" : "bg-orange-600 hover:bg-orange-700"}
          >
            {isTimerRunning ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {isTimerRunning ? "Pause" : "Start Timer"}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setTimerSeconds(180);
              setIsTimerRunning(false);
            }}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="border-t border-gray-800 pt-4 flex items-center justify-between gap-4">
        <Button
          size="lg"
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="border-gray-800 text-gray-200 hover:bg-gray-900 disabled:opacity-30"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous Step
        </Button>

        {currentStep < totalSteps - 1 ? (
          <Button size="lg" onClick={handleNext} className="bg-orange-600 hover:bg-orange-500 font-bold px-8">
            Next Step <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <Button size="lg" onClick={onClose} className="bg-emerald-600 hover:bg-emerald-500 font-bold px-8">
            <CheckCircle className="w-5 h-5 mr-2" /> Finish Cooking
          </Button>
        )}
      </div>
    </div>
  );
}
