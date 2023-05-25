import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'

export const metadata = {
  title: 'SimpleToDo',
  description: 'This is an easy-to-use to-do application',
}


const RootLayout = ({children }: { children: React.ReactNode }) => (
    <html lang="en">
      <body>{children}</body>
    </html>
)

RootLayout.displayName = 'RootLayout';
export default RootLayout;
