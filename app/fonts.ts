import { Lato, Caveat } from "next/font/google";

const lato = Lato({
  weight: "400",
  variable: "--font-lato",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export { lato, caveat };
