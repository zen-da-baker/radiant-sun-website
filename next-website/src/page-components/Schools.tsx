import "../../styles/school-container.css";
import "../../styles/card.css";

export function Schools() {

    return (
        <div className="school-container">

            <h1>Created in association with</h1>

            <div className="flex">
                
                <div className="card flex" style={{ bottom: "0px", right: "10px" }}>
                
                    <div className="flex" style={{ gap: "1rem",  alignItems: "center", width: "100%" }}>

                        <img src="images/Gamespawn Logo.svg" style={{ width: "80px" }} className="d-inline" />
                    
                    
                        <h3 className="d-inline">Gamespawn</h3>

                    </div>
                            
                
                    <p>
                        Game development club at the University of California, Riverside.
                    </p>

                    <a href="https://gamespawn.github.io/index.html" target="_blank" rel="noreferrer">
                        
                        <button className="btn">Organiztion Website</button>

                    </a>
                    
                </div>
                
                <div className="card flex">
                    
                    <div className="flex" style={{ alignItems: "center", height: "5rem", gap: "1rem" }}>

                        <img src="images/UC_Riverside_seal.svg" style={{ width: "80px" }} className="d-inline" />
                    
                        <h3 className="d-inline">University of California, <br /> Riverside</h3>

                    </div>
                                
                </div>
                
                <div className="card flex">

                    <div className="flex" style={{ alignItems: "center", height: "5rem", gap: "1rem" }}>
                    
                        <img src="/images/California_State_University,_Fullerton_seal.svg" style={{ width: "80px" }} className="d-inline" />
                    
                        <h3 className="d-inline">California State University, <br /> Fullerton.</h3>

                    </div>
                            
                </div>
                
            </div>

        </div>
    )
}