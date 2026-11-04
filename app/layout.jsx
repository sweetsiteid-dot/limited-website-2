export const metadata = {
  title: 'Web Bucin Kita ❤️',
  description: 'Special website for us',
};

export default function RootLayout({ children }) {
  return (
        <html lang="id">
          <head>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body className="bg-slate-900 text-white antialiased">
            {children}
          </body>
        </html>
  );
}
