"use client";
import Link from "next/link";
import type { SVGProps } from "react";
import { usePomodoroStore } from "@/lib/store/pomodoro-store";

const Logo = () => {
  const { mode } = usePomodoroStore();
  let color = "#04e17a"; // pomodoro default
  if (mode === "shortBreak") color = "#5294FF";
  else if (mode === "longBreak") color = "#A985FF";
  return (
    <Link href="/" className=" flex items-center gap-2 ">
      <StreamlineStickiesColorTimeDuo color={color} />
    </Link>
  );
};

export default Logo;

export function StreamlineStickiesColorTimeDuo(
  props: SVGProps<SVGSVGElement> & { color?: string }
) {
  const { color = "#04e17a", ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      {...rest}
    >
      <g fill="none">
        <g
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          clipPath="url(#streamlineStickiesColorTimeDuo0)"
          strokeWidth={1}
        >
          <path
            fill="#000"
            d="M19.108 1.066c-9.998 0-18.104 8.106-18.104 18.105c0 10.288 9.617 19.763 19.888 19.763c9.999 0 18.105-8.106 18.105-18.105c0-10.288-9.618-19.763-19.889-19.763"
          ></path>
          <path
            fill={color}
            d="M19.108 37.275c10 0 18.105-8.106 18.105-18.104c0-9.999-8.105-18.105-18.105-18.105c-9.998 0-18.104 8.106-18.104 18.105c0 9.998 8.106 18.104 18.104 18.104"
          ></path>
          <path
            fill="#fff"
            d="M19.108 31.24c6.666 0 12.07-5.403 12.07-12.07c0-6.665-5.404-12.069-12.07-12.069c-6.665 0-12.07 5.404-12.07 12.07s5.405 12.07 12.07 12.07"
          ></path>
          <path
            fill={color}
            d="M20.46 18.217c0-3.765-.93-6.42-2.088-6.42c-1.159 0-2.1 1.665-2.1 5.31c0 4.55 1.93 5.286 4.997 5.299c3.065.012 4.984-.93 4.996-2.089s-1.219-2.1-5.805-2.1"
          ></path>
        </g>
        <defs>
          <clipPath id="streamlineStickiesColorTimeDuo0">
            <path fill="#fff" d="M0 0h40v40H0z"></path>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}
