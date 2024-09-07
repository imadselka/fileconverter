"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { links, utilities } from "@/utils/otherUtilities";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OtherUtilities() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey) {
        const key = e.key.toLowerCase();
        const utility = utilities.find((u) =>
          u.shortcut.toLowerCase().endsWith(key)
        );
        const link = links.find((l) => l.shortcut.toLowerCase().endsWith(key));

        if (utility) {
          e.preventDefault();
          router.push(utility.link);
        } else if (link) {
          e.preventDefault();
          router.push(link.href);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="w-full max-w-4xl px-4">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center gap-3"
        >
          <h1 className="text-4xl font-bold text-center mt-10 mb-6">
            Explore Utilities
          </h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8"
          >
            <Button
              onClick={() => setOpen(true)}
              className="w-[fit-content]"
              variant="outline"
            >
              <div className="flex flex-row justify-center items-center md:gap-[15rem]">
                <span className="mr-2">Search</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {utilities.map((utility, index) => (
            <motion.div
              key={utility.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.05 }}
              className="cursor-auto"
            >
              <Card className="flex flex-col justify-between h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{utility.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {utility.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={utility.link} className="w-full">
                    <Button variant="outline" className="w-full">
                      Try it
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="hidden lg:block">
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Utilities">
                {utilities.map((utility) => (
                  <CommandItem
                    key={utility.title}
                    onSelect={() => {
                      router.push(utility.link);
                      setOpen(false);
                    }}
                  >
                    <span>{utility.title}</span>
                    <CommandShortcut>{utility.shortcut}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Links">
                {links.map((link) => (
                  <CommandItem
                    key={link.title}
                    onSelect={() => {
                      router.push(link.href);
                      setOpen(false);
                    }}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    <span>{link.title}</span>
                    <CommandShortcut>{link.shortcut}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </motion.div>
  );
}
