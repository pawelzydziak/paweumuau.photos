import "./globals.css";

export const metadata = {
    title: "Paweumuau.photos - Portfolio",
    description: "Bardzo ładnie dziś wyglądasz. Pij proszę wodę.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
        <body className="bg-gray-100 text-gray-800">{children}</body>
        </html>
    );
}
