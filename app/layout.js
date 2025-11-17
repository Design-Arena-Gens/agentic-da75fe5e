export const metadata = {
  title: 'Big Christmas Tree',
  description: 'Luxury Christmas Experience',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
