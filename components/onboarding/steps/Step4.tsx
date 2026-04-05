"use client";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/LoadingState";
import { useOnboardingForm } from "@/context/OnboardingForm";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

function Step4() {
  const { workspaceName, workspaceImage, name, useCase, surname } = useOnboardingForm();
  const { update } = useSession();
  const router = useRouter();

  const { mutate: completeOnboarding, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/onboarding", {
        name, surname, useCase, workspaceImage, workspaceName
      });
      return data;
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data
        ? err.response.data
        : "Something went wrong";
      toast.error(error as string);
    },
    onSuccess: async () => {
      toast.success("Successfully completed onboarding 🚀");
      await update({ completeOnboarding: true });
      router.refresh();
      router.push("/dashboard");
    },
    mutationKey: ["completeOnboarding"],
  });

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center w-full min-h-[350px]"
    >
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-red-500/20 rounded-full blur-[40px] -z-10"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-tr from-red-600 to-orange-500 rounded-3xl shadow-2xl flex items-center justify-center rotate-12 mx-auto"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          All set, <span className="text-red-600">{name || "there"}</span>!
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
          Your workspace <strong className="text-gray-900 dark:text-white underline decoration-red-500/30 underline-offset-4">{workspaceName || "Draftly"}</strong> is ready to go.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full max-w-sm"
      >
        <Button
          disabled={isPending}
          onClick={() => completeOnboarding()}
          type="submit"
          className="w-full h-14 bg-red-600 hover:bg-red-700 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] transition-all duration-300 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 overflow-hidden relative group"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          
          {isPending ? (
            <LoadingState loadingText="Setting up your space..." />
          ) : (
            <>
              Launch Draftly <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </motion.div>
    </motion.section>
  );
}

export default Step4;
