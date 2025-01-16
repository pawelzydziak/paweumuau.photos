export default function Muzyka() {
    return (
        <div>
            <h1>Strona muzyka</h1>
            <p>Witaj na stronie muzyka</p>
            <iframe allow="autoplay *; encrypted-media *;" frameBorder="0" height="450"
                    // style="width:100%;max-width:660px;overflow:hidden;background:transparent;"
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src="https://embed.music.apple.com/pl/artist/paweu/1576606683"></iframe>
        </div>
    )
}