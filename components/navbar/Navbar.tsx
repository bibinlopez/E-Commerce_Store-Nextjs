import Container from "../global/Container"
import CartButton from "./CartButton"
import DarkMode from "./DarkMode"
import LinksDropDown from "./LinksDropdown"
import Logo from "./Logo"
import NavSearch from "./NavSearch"




function Navbar() {
  return <div> 
<Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8"> 
<Logo/>
<NavSearch/>
 <div>
  <CartButton/>
  <DarkMode/>
  <LinksDropDown/>
 </div>
    </Container>
  </div>
}

export default Navbar