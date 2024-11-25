import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootRouter from "./router/RootRouter.jsx";
import { pdfjs } from "react-pdf";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from "react-hot-toast";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


pdfjs.GlobalWorkerOptions.workerSrc = 
`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const queryClient = new QueryClient();

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "#fefdef",
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <RootRouter />
                    <Toaster position="top-center" />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>
);
