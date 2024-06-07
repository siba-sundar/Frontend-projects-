import "./navBar.css"


const NavBar = () =>{
    return (

        <>
        <div className="mainNavContainer">
            <div className="navLeftContainer">
                <ul>
                    <li className="navOptions">Home</li>
                    <li className="navOptions">Men</li>
                    <li className="navOptions">Women</li>
                    <li className="navOptions">About Us</li>
                    <li className="navOptions">Contact</li>
                </ul>
            </div>

            <div className="navLogo"></div>

            <div className="navRightContainer">
                <img src="" alt="" />
                <div className="cart">
                    <div className="price"></div>
                    <img src="" alt="" />
                </div>
                <h2>Log In</h2>
            </div>
        </div>
        </>
    )
}



export default NavBar