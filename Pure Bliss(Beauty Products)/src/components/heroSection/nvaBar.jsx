import "./navBar.css"


const NavBar = () =>{
    return (

        <>
        <div className="mainNavContainer">
                <ul className="navLeftContainer">
                    <li className="navOptions">Home</li>
                    <li className="navOptions">Men</li>
                    <li className="navOptions">Women</li>
                    <li className="navOptions">About Us</li>
                    <li className="navOptions">Contact</li>
                </ul>

            <div className="navLogo">
                <h1>Pure Bliss</h1>
                <p>Enjoy the beauty</p>
            </div>

            <div className="navRightContainer">
                <img src="" alt="" />
                <div className="cart">
                    <div className="price">$0.00</div>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAbJJREFUWEftlr1NBDEQhb+TEHVARkINQAW0ABEZFSABogpIgDZIoAJyEn4kuiCAe2h9mvXu3o5njbjgHO6Nx9+8N2PfjBVbsxXjYQ005shaoVKFvsc2/MHvl/OcFylvbtl/AIllwbEKQO/A9pBC1pEj4Lb58AQcVLRLFp03+ZZalp/5Bmw1H1WFqqmxbGuoUBX8u8bGXgpJKa1WJROoVKAK1WrZ5QHaBx7NZlUzVSVrV6cVxhQSi7WtJW9QJRWoQntV9wDZiu6A4yCItlm7eh3yAFnblGRKc9vJ7fSPp4eSGNY2qfQRVGlvmV0lQNa2IEtnW6/SHsuS92rGdCdNhRq8QrxAArDTIf/vA1Tap1EfvDpKgP7yKVnUVgKU30lTpm1Q3FIg+5REbZNli7crJysFUlNPbe6lb2IpkArSRSmlohNXHSipLLD0JpUMXFXLSg4OxUYsSwddNw/tK3AKPPQQeGJa26JA9k5SwhdgJwPyxHRqiAKdAVcm2xewmWX3xFQD2gWegY0m4w1wkmX3xFQDUiIdeAh8zq8A/SXpW56YKj0UmiDPpmgPeXKHYtZAY7L9AGzuUiV/2ipNAAAAAElFTkSuQmCC"/>
                </div>
                <h2>Log In</h2>
            </div>
        </div>
        </>
    )
}



export default NavBar