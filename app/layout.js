import { EpisodesProvider } from '@/context/EpisodesContext';
import { Episodesv2Provider } from '@/context/EpisdoesContextv2';
import { SpeedInsights } from "@vercel/speed-insights/next";
import EmailPopup from '@/components/EmailPopup';
import Header from '@/components/Header';
import './globals.scss'
import { Rubik, Gochi_Hand } from 'next/font/google'
import HeaderGap from '@/components/HeaderGap';
import Footer from '@/components/Footer';
import RandomDrawings from '@/components/RandomDrawings';
import BottomEpisodePlayer from '@/components/BottomEpisodePlayer';
import { CSPostHogProvider } from "./providers";
import Head from 'next/head';

const rubik = Rubik({ subsets: ["latin"] });
const gochi = Gochi_Hand({ subsets: ["latin"], weight: "400", variable: "--font-gochi" });

export const metadata = {
  title: 'This Teenage Life',
  description: 'With approximately 50 teen participants and hundreds of thousands of listeners, we help teens throughout the world develop communication skills, authentic community, and a sense of purpose.',
}

export default function RootLayout({ children }) {
  return (
    <Episodesv2Provider>
      <html lang="en">
        <CSPostHogProvider>
          <SpeedInsights />
          <body className={gochi.variable}>
            {/* <RandomDrawings /> */}
            <BottomEpisodePlayer />
            <Header />
            <HeaderGap />
            {children}
            <EmailPopup />
            <Footer />
          </body>
        </CSPostHogProvider>
      </html>
    </Episodesv2Provider>
  );
}
