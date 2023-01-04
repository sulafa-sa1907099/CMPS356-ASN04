"use client";

import "./globals.css";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";


export default function Layout({ children }) {
  const [queryClient] = useState(() => new QueryClient());


  return (
    <html lang="en">
      <head />
      <body>
          <QueryClientProvider client={queryClient}>
            <main style={{ padding: "20px" }}>
              {/* <Container maxWidth="lg" sx={{ padding: 2 }}> */}
              {children}
              {/* </Container> */}
            </main>
          </QueryClientProvider>
      </body>
    </html>
  );
}
