import "./globals.css";

export const metadata = {
    title: "Portfolio",
    description: "Photo portfolio of your albums",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="bg-gray-100 text-gray-800">{children}</body>
        </html>
    );
}
