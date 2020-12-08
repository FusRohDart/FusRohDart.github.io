import React from 'react' 
import signup from './signup' 
import { Container } from 'react-bootstrap' 
import { AuthProvider } from "../Contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'

function App () { 
    return ( 
        
            <Container 
                className="d-flex align-items-center justify-content-center" 
                style={{minHeight: "100vh"}} 
            > 
                <div className="w-100" stlye={{maxWidth: "400px"}}> 
                    <Router> 
                        <AuthProvider> 
                            <Switch> 
                                <Route exact path="/" component={Dashboard} />
                                <Route path="/signup" component={signup} /> 
                                <Route path="/login" component={Login} />
                            </Switch>
                        </AuthProvider>
                    </Router>
                    <signup />
                </div>
            </Container>
        
    ) 
} 

export default App; 