export function Quotation() {
    return (
        <>
            <h2>Conocé la cotización de tu vehículo</h2>
            <p>Si lo vendes con nosotros, recibís:</p>
            <div className="card">
                <div className="flex flex-wrap align-items-center justify-content-center card-container">
                    <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem min-h-full">
                        $ 900.000 - $ 1.200.000
                    </div>
                </div>
            </div>
            <p>Otras agencias te lo pueden recibir a:</p>
            <div className="card">
                <div className="flex flex-wrap align-items-center justify-content-center card-container">
                    <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem min-h-full">
                        $ 700.000
                    </div>
                    <br/>
                    <div className="surface-overlay border-round border-1 p-3 m-3 w-16rem min-h-full">
                        $ 650.000
                    </div>
                </div>
            </div>

        </>
    );
}