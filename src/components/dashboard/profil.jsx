import Dashboard from "./dashboard";
import Navbar from "../../layouts/navbar/Navbar";

function Profil(){
    return(
        <>
        {/* SECTION HEADER - START */}
            <Navbar/>
        {/* SECTION HEADER - END */}

        {/* SECTION DASHBOARD - START */}
        <section className="sectionDashboard">
            <Dashboard/>
        </section> 
        {/* SECTION DASHBOARD - START */}  
        </>
    );
}

export default Profil;
