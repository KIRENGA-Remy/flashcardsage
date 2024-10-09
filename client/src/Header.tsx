
export function Header() {
    return (
        <div className="h-24 flex items-center justify-around font-bold shadow-md">
            <div className="cursor-pointer hover:underline text-2xl">
                <a href="/">FlashCardSage</a>
            </div>
            <div className="cursor-pointer hover:underline text-lg">
            <a href="#">Decks</a>
            </div>
            <div className="cursor-pointer hover:underline text-lg">
            <a href="#">Login</a>
            </div>
        </div>
    )
}