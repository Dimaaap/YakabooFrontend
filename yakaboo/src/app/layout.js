import { Montserrat } from "next/font/google";
import { Header, Footer, PageModals } from "../../components/shared";
import "../../styles/main.scss"

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
          <Header />
          {children}
          <PageModals />
          <Footer />
      </body>
    </html>
  );
}
