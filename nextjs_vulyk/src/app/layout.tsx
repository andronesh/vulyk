import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackQueryClientProvider from "@/logic/queries/TanstackQueryClientProvider";
import Link from "next/link";
import { Tags } from "lucide-react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Вулик",
	description: "Облік наявності та справності дронів",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} dark bg-military-900 antialiased`}>
				<button
					data-drawer-target="default-sidebar"
					data-drawer-toggle="default-sidebar"
					aria-controls="default-sidebar"
					type="button"
					className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-hidden sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				>
					<svg
						className="h-6 w-6"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clipRule="evenodd"
							fillRule="evenodd"
							d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
						></path>
					</svg>
				</button>

				<aside
					id="default-sidebar"
					className="fixed top-0 left-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
					aria-label="Sidebar"
				>
					<div className="dark:bg-military-800 h-full overflow-y-auto bg-gray-50 px-3 py-4">
						<ul className="space-y-2 font-medium">
							<li>
								<Link
									href="/"
									className="group dark:hover:bg-military-500 flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white"
								>
									<svg
										className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 22 21"
									>
										<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
										<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
									</svg>
									<span className="ms-3">Зведення</span>
								</Link>
							</li>
							<li>
								<Link
									href="/drones"
									className="group dark:hover:bg-military-500 flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white"
								>
									<svg
										className="h-5 w-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="m14.707,16.122s.001,0,.001,0l3.585,3.584c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.024,0-1.414l-3.585-3.585c-.723-.724-1.122-1.685-1.122-2.708s.398-1.983,1.122-2.707c0,0,0-.001,0-.001l3.584-3.584c.391-.391.391-1.023,0-1.414s-1.023-.391-1.414,0l-3.586,3.586c-1.444,1.446-3.966,1.446-5.412.001,0,0,0,0-.001-.001,0,0-.001,0-.001,0l-3.585-3.585c-.391-.391-1.023-.391-1.414,0s-.391,1.023,0,1.414l3.585,3.586c.723.724,1.122,1.685,1.122,2.707s-.398,1.984-1.122,2.708c0,0,0,.001,0,.001l-3.584,3.584c-.391.39-.391,1.023,0,1.414s1.023.391,1.414,0l3.586-3.585c.723-.723,1.684-1.122,2.707-1.122,1.007,0,1.993.408,2.705,1.12,0,0,0,.001.001.002Zm-.549-12.371c.568-2.208,2.559-3.751,4.842-3.751,2.757,0,5,2.243,5,5,0,2.283-1.542,4.274-3.751,4.842-.083.021-.167.032-.25.032-.446,0-.852-.299-.968-.751-.138-.535.184-1.08.719-1.217,1.324-.341,2.249-1.536,2.249-2.906,0-1.654-1.346-3-3-3-1.37,0-2.565.925-2.906,2.249-.137.535-.679.859-1.217.719-.535-.137-.857-.683-.719-1.217Zm9.842,15.249c0,2.757-2.243,5-5,5-2.283,0-4.274-1.542-4.842-3.751-.138-.535.184-1.08.719-1.217.538-.138,1.08.185,1.217.719.341,1.324,1.536,2.249,2.906,2.249,1.654,0,3-1.346,3-3,0-1.37-.925-2.564-2.249-2.905-.535-.137-.857-.683-.719-1.217.137-.535.681-.857,1.217-.719,2.208.568,3.751,2.559,3.751,4.842Zm-14.158,1.25c-.568,2.208-2.56,3.75-4.842,3.75-2.757,0-5-2.243-5-5,0-2.283,1.542-4.274,3.751-4.842.538-.138,1.081.184,1.217.719.138.535-.184,1.08-.719,1.217-1.324.341-2.249,1.536-2.249,2.905,0,1.654,1.346,3,3,3,1.37,0,2.564-.925,2.906-2.25.138-.535.679-.857,1.218-.719.535.138.856.683.719,1.218ZM0,5C0,2.243,2.243,0,5,0c2.282,0,4.273,1.542,4.842,3.75.138.535-.184,1.08-.719,1.218-.535.139-1.08-.184-1.218-.719-.341-1.325-1.536-2.25-2.906-2.25-1.654,0-3,1.346-3,3,0,1.37.925,2.565,2.249,2.906.535.137.857.683.719,1.217-.116.451-.522.751-.968.751-.083,0-.166-.01-.25-.032-2.208-.568-3.751-2.559-3.751-4.842Z" />
									</svg>
									<span className="ms-3 flex-1 whitespace-nowrap">Дрони</span>
									<span className="ms-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
										12п/30б
									</span>
								</Link>
							</li>
							<li>
								<Link
									href="/specs"
									className="group dark:hover:bg-military-500 flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white"
								>
									<svg
										className="h-5 w-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M22,14c0,.552-.447,1-1,1H9c-.552,0-1-.448-1-1s.448-1,1-1h12c.553,0,1,.448,1,1ZM5,12H3c-.552,0-1,.448-1,1v2c0,.552,.448,1,1,1h2c.552,0,1-.448,1-1v-2c0-.552-.448-1-1-1Zm16,7H9c-.552,0-1,.448-1,1s.448,1,1,1h12c.553,0,1-.448,1-1s-.447-1-1-1Zm-16-1H3c-.552,0-1,.448-1,1v2c0,.552,.448,1,1,1h2c.552,0,1-.448,1-1v-2c0-.552-.448-1-1-1ZM24,3.5v3c0,1.933-1.567,3.5-3.5,3.5H3.5c-1.933,0-3.5-1.567-3.5-3.5V3.5C0,1.567,1.567,0,3.5,0H20.5c1.933,0,3.5,1.567,3.5,3.5Zm-4.886,0h-4.257c-.697,0-1.043,.846-.546,1.334l1.858,1.825c.455,.455,1.177,.455,1.632,0l1.858-1.825c.498-.489,.152-1.334-.546-1.334Z" />
									</svg>
									<span className="ms-3 flex-1 whitespace-nowrap">Характеристики</span>
								</Link>
							</li>
							<li>
								<Link
									href="/models"
									className="group dark:hover:bg-military-500 flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
										viewBox="0 0 24 24"
										stroke="currentColor"
										fill="currentColor"
									>
										<path d="M17,0H7C4.243,0,2,2.243,2,5v14c0,2.757,2.243,5,5,5h10c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-7,19c0,.552-.448,1-1,1h-2c-.552,0-1-.448-1-1v-2c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1v2Zm0-6c0,.552-.448,1-1,1h-2c-.552,0-1-.448-1-1v-2c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1v2Zm0-6c0,.552-.448,1-1,1h-2c-.552,0-1-.448-1-1v-2c0-.552,.448-1,1-1h2c.552,0,1,.448,1,1v2Zm7,12h-4c-1.308-.006-1.307-1.994,0-2h4c1.308,.006,1.307,1.994,0,2Zm0-6h-4c-1.308-.006-1.307-1.994,0-2h4c1.308,.006,1.307,1.994,0,2Zm0-6h-4c-1.308-.006-1.307-1.994,0-2h4c1.308,.006,1.307,1.994,0,2Z" />
									</svg>
									<span className="ms-3 flex-1 whitespace-nowrap">Моделі</span>
								</Link>
							</li>
							<li>
								<Link
									href="/locations"
									className="group dark:hover:bg-military-500 flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white"
								>
									<svg
										className="h-5 w-5 shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="m16.949,2.05c-1.321-1.322-3.079-2.05-4.949-2.05s-3.628.728-4.95,2.05c-2.729,2.729-2.729,7.17.008,9.907l2.495,2.44c.675.66,1.561.99,2.447.99s1.772-.33,2.447-.99l2.502-2.448c1.322-1.322,2.051-3.08,2.051-4.95s-.729-3.627-2.051-4.95Zm-4.949,7.94c-1.657,0-3-1.343-3-3s1.343-3,3-3,3,1.343,3,3-1.343,3-3,3Zm12,6.772c.002.354-.183.682-.485.863l-9.861,5.917c-.51.306-1.082.459-1.653.459s-1.144-.153-1.653-.459L.485,17.625c-.303-.182-.487-.51-.485-.863.002-.353.19-.679.495-.857l4.855-2.842c.1.11.203.219.309.325l2.495,2.439c1.028,1.006,2.395,1.561,3.846,1.561s2.817-.555,3.846-1.561l2.518-2.463c.098-.098.194-.199.287-.301l4.854,2.841c.305.179.493.505.495.857Z" />
									</svg>
									<span className="ms-3 flex-1 whitespace-nowrap">Локації</span>
									<span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
										3
									</span>
								</Link>
							</li>
							<li>
								<Link
									href="/markers"
									className="group dark:hover:bg-military-500 flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white"
								>
									<Tags className="text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
									<span className="ms-3 flex-1 whitespace-nowrap">Маркери</span>
								</Link>
							</li>
							<li>
								<Link
									href="/betaflight"
									className="group dark:hover:bg-military-500 flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white"
								>
									<Tags className="text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
									<span className="ms-3 flex-1 whitespace-nowrap">Betaflight</span>
								</Link>
							</li>
						</ul>
					</div>
				</aside>

				<div className="p-4 sm:ml-64">
					<TanstackQueryClientProvider>{children}</TanstackQueryClientProvider>
				</div>
			</body>
		</html>
	);
}
