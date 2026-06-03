import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}) {
  return (
    <html>
      <body suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}