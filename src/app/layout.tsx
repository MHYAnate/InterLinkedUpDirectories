import type { Metadata } from "next";
import styles from "./styles.module.css";
import { Suspense } from "react";
import Loading from "@/app/register/logo";
import StoreProvider from "@/lib/store/StoreProvider";

export const metadata: Metadata = {
	title: "Business Made Easy",
	description: "An InterLinked Up Directories of Business",
	metadataBase: new URL("https://ilud.vercel.app"),
};

import type { Viewport } from "next";

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "cyan" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	colorScheme: "light",
};

export default function Layout(props: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				<div className={styles.children}>
					<Suspense fallback={<Loading />}>
						<StoreProvider>{props.children}</StoreProvider>
					</Suspense>
				</div>
			</body>
		</html>
	);
}
