"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { Birthstone } from "next/font/google";

const birthstone = Birthstone({
    weight: "400",
    subsets: ["latin"],
});

interface LogoProps {
    href?: string;
    className?: string;
    showIcon?: boolean;
}

export default function Logo({
                                 href = "/",
                                 className,
                                 showIcon = true,
                             }: LogoProps) {
    return (
        <Link href={href} className={clsx("inline-flex", className)}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-2 cursor-pointer select-none"
            >
                {showIcon && (
                    <img
                        src="/assets/Initalen.JPG"
                        alt="Initialen"
                        className="w-6 h-6 object-contain rounded-full"
                    />
                )}

                <span
                    className={`${birthstone.className} text-lg sm:text-2xl leading-none text-primary`}
                >
          Elias
          <span className="text-base-content/60"> Kaiser</span>
        </span>
            </motion.div>
        </Link>
    );
}