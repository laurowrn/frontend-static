import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <meta name="description" content="" />
        <meta property="og:url" content="https://www.tikko.com.br/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Colmeia" />
        <meta property="og:description" content="" />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/images/52928b8c-e7c8-4970-a088-f4795fb7b667.png?token=K0zAmRySFekNHyJBz4VWgYpYlTCS401VL-ZTU6er7XQ&height=1200&width=1200&expires=33280923923"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="tikko.com.br" />
        <meta property="twitter:url" content="https://www.tikko.com.br/" />
        <meta name="twitter:title" content="Colmeia" />
        <meta name="twitter:description" content="" />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/images/52928b8c-e7c8-4970-a088-f4795fb7b667.png?token=K0zAmRySFekNHyJBz4VWgYpYlTCS401VL-ZTU6er7XQ&height=1200&width=1200&expires=33280923923"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
