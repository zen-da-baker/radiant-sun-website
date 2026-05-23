import "../../styles/team.css";

import twitterLogo from "../../public/images/Logo_of_Twitter.svg";

export function Team() {

    return (
        <div className="team-container">

            <div className="flex">
                
                <div className="card">
                    
                    <h3>Angel</h3>

                    <p className="card-text">Producer, Writer, & Director</p>

                    <p className="card-text">
                        Angel is the producer of the Radiant Sun video game project, beginning in 2021. 
                        Currently, he is writing film scripts at a professional level.
                    </p>

                    <a href="https://angelmayorga.weebly.com/" target="_blank" rel="noreferrer">
                    
                        <button className="btn">Portfolio</button>
                        
                    </a>
                    
                </div>

                <div className="card">
                    
                    <h3>Donovan</h3>

                    <p className="card-text">Writer, Editor, & Web Developer</p>

                    <p className="card-text">
                        Don joined the team back in 2021 as a developmental editor for the script but also brought his experience in web development to 
                        design the website you see today :) !
                    </p>
                    
                    <a href="https://donovanfrazier.com" target="_blank" rel="noreferrer">

                        <button className="btn">Portfolio</button>

                    </a>
                    
                </div>
                
                <div className="card">

                    <h3>Jesse</h3>

                    <p className="card-text">Musician</p>

                    <p className="card-text">Hi! Just a guy who wanted to add a little bit of value to a passion project.</p>

                    <a href="mailto:jcazu001@ucr.edu" target="_blank" rel="noreferrer">

                        <button className="btn">Email</button>

                    </a>
                    
                </div>
                
                <div className="card">
                    
                    <h3>Starri</h3>

                    <p className="card-text">Artist</p>

                    <p className="card-text">I'm Starri! I like drawing and designing characters and I also play way too many gacha games!</p>

                    <a href="https://twitter.com/4kstarri" target="_blank" rel="noreferrer">
                    
                        <button className="btn flex"> 
                            
                            <img src={ twitterLogo.src } height={ 20 } width={ 20 } alt="Twitter logo" /> 
                            
                            @4kstarri 
                            
                        </button>
                    
                    </a>
                    
                </div>
                
            
                <div className="card">
                    
                    <h3>Edwin</h3>

                    <p className="card-text">Programmer</p>
                    
                </div>
                
                <div className="card">
                    
                    <h3>Aramis</h3>
                    
                    <p className="card-text">Programmer</p>
                    
                </div>
               

                    <div className="card">
                            
                        <h3>Daphne F.</h3>

                        <p className="card-text">Programmmer</p>

                        <p className="card-text">
                            Daphne enjoys music, gaming, and her cats. When she’s not working in the entertainment industry or doing voice over and singing work, 
                            she enjoys archery, karaoke, podcasting, and window shopping for cat trees. 
                        </p>

                        <p className="card-text">
                            Thank you to Angel and Team for being kind, patient, and loving the craft of storytelling and video game development. It was a pleasure. 
                        </p>

                        <a href="https://www.deefayy.com" target="_blank" rel="noreferrer">
                            
                            <button className="btn">Portfolio</button>
                        
                        </a>

                </div>

                <div className="card">

                    <h3>Peter</h3>

                    <p className="card-text">Programmer</p>

                </div>

                <div className="card">
                               
                    <h3>John Henry Ronk</h3>

                    <p className="card-text">Play Tester</p>

                    <p className="card-text">
                        John Henry Ronk, graduated class of 2022 at University of California Riverside with a bachelor's degree in creative writing. 
                        Has an interest in fiction, particularly speculative fiction, as well as culture, language, programming, and art.
                    </p>

                </div>

                <div className="card">

                    <h3>Braxton</h3>

                    <p className="card-text">Beta Tester</p>
                        
                </div>
                
            </div>

        </div>
    )
}