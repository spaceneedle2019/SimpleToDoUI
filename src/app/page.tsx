import styles from './page.module.css'

const Page = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <big>SimpleToDo</big>
            <small><em>An easy-to-use to-do application.</em></small>
        </div>
      </nav>
    );
}

Page.displayName = 'Page';
export default Page;
