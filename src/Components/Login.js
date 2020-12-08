import React, { useRef, useState } from 'react' 
import { card, form, button, Card, Alert } from 'react-bootstrap' 
import { useAuth } from "../Contexts/AuthContext" 
import { Link, useHistory } from 'react-router-dom'

export default function Login() {
    const emailRef = useRef(); 
    const passwordRef = useRef(); 
    const { login } = useAuth(); 
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const history = useHistory(); 

    async function handleSubmit(e) {
        e.preventDefault(); 

        try { 
            setError(''); 
            setLoading(true); 
            await login(emailRef.current.value, passwordRef.current.value); 
            history.push("/"); 
        } catch { 
            setError('Failed to log in!'); 
        } 

        setLoading(false);

    }

    return (
        <>
            <Card> 
                <Card.body> 
                    <h2 className="text-center mb-4">Log in to Your Account</h2> 
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}> 
                        <Form.Group id="email"> 
                            <Form.Label>Email</Form.Label> 
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group> 
                        <Form.Group id="password"> 
                            <Form.Label>Password</Form.Label> 
                            <Form.Control type="email" ref={passwordRef} required />
                        </Form.Group> 
                        <Button disable={loading} className="w-100" type="submit">Log In</Button>
                    </Form>
                </Card.body>
            </Card> 
            <div className="w-100 text-center mt-2"> 
                Don't have an account? <Link to="/signup">Create Now!</Link>
            </div>
        </>
    )
}

/*
const url = 'https://api.trumail.io/v2/lookups/json?email='; 
const email = 'nabyl0405@gmail.com'; 

const verifyEmail = async () => {
    const endpoint = `${url}${email}`; 

    try { 
        const response = await fetch (endpoint); 
    } catch (error) { 
        console.log(error); 
    }
} 
*/