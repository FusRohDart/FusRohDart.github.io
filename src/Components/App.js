import React from 'react' 
import signup from './signup' 
import { Container } from 'react-bootstrap' 
import { AuthProvider } from "../Contexts/AuthContext"

function App () { 
    return ( 
        <AuthProvider>
            <Container 
                className="d-flex align-items-center justify-content-center" 
                style={{minHeight: "100vh"}} 
            > 
                <div className="w-100" stlye={{maxWidth: "400px"}}> 
                    <signup />
                </div>
            </Container>
        </AuthProvider>
    ) 
} 

export default App; 