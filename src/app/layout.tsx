import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'

export const metadata = {
  title: 'SimpleToDo',
  description: 'This is an easy-to-use to-do application',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <big>SimpleToDo</big>
            <small>
              <em>An easy-to-use to-do application.</em>
            </small>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </body>
  </html>
)

RootLayout.displayName = 'RootLayout'
export default RootLayout
