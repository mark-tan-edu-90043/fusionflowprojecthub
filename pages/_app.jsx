// Importing global styles from the provided CSS file to ensure consistent styling across the application.
import "./globals.css";

// Exporting a default function named MyApp, which is a wrapper component for Next.js applications.
// This function takes two props: Component and pageProps, which are provided by Next.js automatically.
export default function MyApp({ Component, pageProps }) {

  // Rendering the Component passed as prop with its associated pageProps.
  return <Component {...pageProps} />
}