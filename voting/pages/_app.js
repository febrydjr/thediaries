import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Retrieve the title from the page's props or meta data
      const pageTitle = Component.title || 'Diary';
      document.title = `${pageTitle} - Diary`;
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Set the title when the component mounts initially
    handleRouteChange(router.pathname);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, Component]);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
