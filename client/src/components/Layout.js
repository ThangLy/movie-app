import Header from './Header';
import Banner from './Banner';
import Movies from './Movie';

export default function Layout() {
    return (
        <>
            <div className="header">
                <Header />
            </div>
            <div className="banner">
                <Banner />
            </div>
            <div className="movies">
                <Movies />
            </div>

        </>
    );
}