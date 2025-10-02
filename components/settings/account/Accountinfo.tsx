"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Session } from "next-auth";
import { useLocale, useTranslations } from "next-intl";
import Profileimage from "@/components/onboarding/Profileimage";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  accountInfoSettingsSchema,
  AccountInfoSettingsSchema,
} from "@/schema/AccountInfoSettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useChangeLocale from "@/hooks/useChangeLocale";
import { LoadingState } from "@/components/ui/LoadingState";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface Props {
  session: Session;
}

const languages = [
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
] as const;

const AccountInfo = ({
  session: {
    user: { image, name, surname, username },
  },
}: Props) => {
  const t = useTranslations("SETTINGS");
  const lang = useLocale();
  const { update } = useSession();
  const router = useRouter();
  const form = useForm<AccountInfoSettingsSchema>({
    resolver: zodResolver(accountInfoSettingsSchema),
    defaultValues: {
      username: username!,
      language: lang,
      name: name || "",
      surname: surname || "",
    },
  });

  const { onChange } = useChangeLocale();

  const { mutate: editProfile, isPending } = useMutation({
    mutationFn: async (updatedData: AccountInfoSettingsSchema) => {
      const { data } = (await axios.post(
        "/api/profile/edit",
        updatedData
      )) as AxiosResponse<AccountInfoSettingsSchema>;
      return data;
    },
    onError: (err: AxiosError) => {
      toast.error(err?.response?.data as string || "Something went wrong");
    },
    onSuccess: async (res: AccountInfoSettingsSchema) => {
      if (res.language !== lang) onChange(res.language as "EN" | "HI");
      await update();
      toast.success("Profile updated successfully!");
      router.refresh();
    },
    mutationKey: ["profileEdit"],
  });

  const onSubmit = (data: AccountInfoSettingsSchema) => {
    editProfile(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      <Card
        className="
        max-w-3xl mx-auto rounded-2xl 
        bg-gradient-to-br from-white via-gray-50 to-gray-100
      dark:from-gray-950 dark:via-gray-900 dark:to-black shadow-xl
        backdrop-blur-md transition-all border-0 border-white"
      >
        <CardContent>
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 blur-lg opacity-40 animate-pulse cursor-pointer" />
              <Profileimage profileImage={image} />
            </div>
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              {t("ACCOUNT.TITLE")}
            </h2>
          </motion.div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Username + Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium opacity-80">
                        {t("ACCOUNT.USERNAME")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg 
                          dark:bg-gray-800/60 dark:border-gray-700 dark:focus:ring-purple-500
                          bg-gray-50 border focus:ring-indigo-500
                          transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium opacity-80">
                        {t("ACCOUNT.FIRST_NAME")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg 
                          dark:bg-gray-800/60 dark:border-gray-700 dark:focus:ring-purple-500
                          bg-gray-50 border focus:ring-indigo-500
                          transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Surname + Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium opacity-80">
                        {t("ACCOUNT.SURNAME")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-lg 
                          dark:bg-gray-800/60 dark:border-gray-700 dark:focus:ring-purple-500
                          bg-gray-50 border focus:ring-indigo-500
                          transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium opacity-80">
                        {t("ACCOUNT.LANG")}
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between rounded-lg w-full",
                                "dark:bg-gray-800/60 dark:border-gray-700",
                                "bg-gray-50 border"
                              )}
                            >
                              {field.value
                                ? languages.find(
                                  (language) => language.value === field.value
                                )?.label
                                : t("ACCOUNT.SELECT_LANGUAGE")}
                              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-60" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder={t("ACCOUNT.SEARCH_LANGUAGE")}
                            />
                            <CommandEmpty>
                              {t("ACCOUNT.NO_LANGUAGE")}
                            </CommandEmpty>
                            <CommandGroup>
                              <CommandList>
                                {languages.map((language) => (
                                  <CommandItem
                                    value={language.label}
                                    key={language.value}
                                    onSelect={() => {
                                      form.setValue("language", language.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        language.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {language.label}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  disabled={isPending}
                  className="rounded-lg w-full sm:w-auto 
                  text-white font-semibold
                  bg-gradient-to-r from-purple-500 to-indigo-500 
                  hover:from-indigo-500 hover:to-purple-500
                  transition-all shadow-md cursor-pointer"
                  type="submit"
                >
                  {isPending ? (
                    <LoadingState loadingText="Updating..." />
                  ) : (
                    t("ACCOUNT.UPDATE_BTN")
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AccountInfo;
