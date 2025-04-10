// styles
import { Inter, Poppins } from "next/font/google"

export const inter = Inter ({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-inter",
});

export const poppins = Poppins ({
    subsets: ["latin"],
    weight: ["400", "500", "600", "800"],
    variable: "--font-poppins",
});