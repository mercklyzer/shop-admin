import React from "react";

const NotFound = props => {
    return (
        <div className="w-screen h-screen bg-white">
            <div className="flex flex-col items-center justify-center h-full">
                <img 
                    className="max-w-[40rem] h-auto"
                    src={'https://firebasestorage.googleapis.com/v0/b/shop-c4574.appspot.com/o/not_found.svg?alt=media&token=704a83d3-17d9-4813-88c3-da8c71ab2469'} />
                    <div className="w-full text-2xl font-semiold text-center mt-12">Page not found. We'll be working on it.</div>
            </div>
        </div>
    )
}

export default NotFound