import type { Metadata } from "next";
import styles from "./styles.module.css";
import { Suspense } from 'react'
import Loading from "@/app/register/logo";



export const metadata: Metadata = {
  title: "Inter Linked Up Directories",
  description: "Generated by create next app",
  metadataBase: new URL('https://ilud.vercel.app'),
};

import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  colorScheme: 'light',
}


export default function Layout(props: {
  children: React.ReactNode;
}) {

  return (
    <html>
     <body>
          <div className={styles.children}>
          <Suspense fallback={<Loading/>}>
            {props.children}
            </Suspense>
          </div>
      </body>
    </html>
  );
}
