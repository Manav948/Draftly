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
            await update();
            router.push("/dashboard");
            router.refresh();
        },
        mutationKey: ["completeOnboarding"],
    });

    return (
        <section className="flex flex-col items-center justify-center text-center py-10 px-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    🎉 You're all set!
                </h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                    Your workspace <span className="font-semibold">{workspaceName}</span>{" "}
                    is ready to go.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md"
            >
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Click below to start using <span className="font-semibold">Draftly</span>.
                </p>
                <Button
                    disabled={isPending}
                    onClick={() => completeOnboarding()}
                    type="submit"
                    className="w-full py-6 text-lg font-medium"
                >
                    {isPending ? <LoadingState /> : <>🚀 Start Using Draftly</>}
                </Button>
            </motion.div>
        </section>
    );
}

export default Step4;
