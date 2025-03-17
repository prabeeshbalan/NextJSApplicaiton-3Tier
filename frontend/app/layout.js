// app/layout.js
export const metadata = {
    title: 'My 3-Tier Application',
    description: 'A simple 3-tier web application with Next.js, Express, and MySQL',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          {/* You can add your global styles or other components here */}
          {children}
        </body>
      </html>
    );
  }
  