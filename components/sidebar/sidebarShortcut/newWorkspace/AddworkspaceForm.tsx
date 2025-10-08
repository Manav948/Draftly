"use client";
import UploadFile from "@/components/onboarding/UploadFile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ApiWorkspaceSchema, apiWorkspaceSchema } from "@/schema/workSpaceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface Props {
  onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddworkspaceForm = ({ onSetOpen }: Props) => {
  const t = useTranslations("WORKSPACE");
  const form = useForm<ApiWorkspaceSchema>({
    resolver: zodResolver(apiWorkspaceSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl shadow-xl 
                 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 
                 border border-gray-200 dark:border-gray-800"
    >
      <Form {...form}>
        <form className="flex flex-col gap-6">
          {/* Input Field */}
          <FormField
            name="workspaceName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wide">
                  {t("INPUTS.NAME")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-700 
                               text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={t("PLACEHOLDERS.NAME")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Upload File */}
          <UploadFile
            form={form}
            schema={apiWorkspaceSchema}
            inputAccpect="image/*"
            typesDescription={[".jpg", ".jpeg", ".png", ".webp", ".gif"]}
          />

          {/* Button */}
          <div className="flex items-center justify-between w-full">
            <Button
              type="submit"
              className="w-full rounded-lg px-6 py-2 font-semibold tracking-wide 
                         bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 
                         text-white shadow-md hover:shadow-blue-400/40 hover:scale-[1.02] 
                         transition-all duration-300"
            >
              {t("BTN_ADD")}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default AddworkspaceForm;
