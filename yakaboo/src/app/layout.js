import { Montserrat } from "next/font/google"

const monserrat = Montserrat(
  {
    subsets: ["cyrillic", "latin"],
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal", "italic"]
  })

export const metadata = {
  title: "Yakaboo Clone",
  description: "Yakaboo Clone Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={ monserrat.className }
      >
        {children}
      </body>
    </html>
  );
}
