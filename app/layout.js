// Components
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// Styles
import "@/app/_styles/globals.css";

// Fonts
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";

const josefinFont = Josefin_Sans({
  subsets: ["latin"], // could be others like 'greec' or 'chineese'
  display: "swap", // displayes a default font then swap when the font downloaded
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "The Wild Oasis | %s",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefinFont.className} relative antialiased bg-primary-950 text-primary-100 min-h-svh flex flex-col`}
      >
        <Header />
        <main className="flex-1 px-8 py-12 grid">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
