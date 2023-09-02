import "../styles/globals.css";

export default function App({Component, pageProps}) {
  return (
    <div>
      <Component {...pageProps} />
      <span>Wow</span>
    </div>
  )
}
