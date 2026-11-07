export function GameInstructions() {

    return (
        <div className="container">

            <div className="row">
                <div className="col-4">
                    <div className="card text-white bg-success mb-3" style={{ maxWidth: "18rem" }}>
                        <div className="card-header">Saving the Game</div>
                        <div className="card-body">
                            <h3 className="card-title">Use the game menu to save the game</h3>
                            <p className="card-text">
                                Save files are stored in the browser's save data. The game save will not leave you device and will not be sent to the internet.
                                <br />
                                To resume the game, open the game in the same browser on the same device.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <h1 className="text-center">How to Play</h1>
                    <div className="row">
                        <div className="col">
                            <p>
                                Mouse = Click on any menu item you'd like :)

                                <br />

                                Arrow Keys = Navigate menu and move character

                                <br />

                                Enter = Confirm

                                <br />

                                Spacebar = Jump 
                            </p>
                        </div>

                        <div className="col">
                            <p>
                                ESC or X = Open menu

                                <br />

                                ESC = Back

                                <br />

                                F = Check enemy unit data

                                <br />

                                I = Show game objective hint

                                <br />

                                Shift + Arrow keys = Sprint

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
    )
}