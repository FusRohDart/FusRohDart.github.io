import React, { useRef, useState } from 'react' 
import { card, form, button, Card, Alert } from 'react-bootstrap' 
import { useAuth } from "../Contexts/AuthContext"

export default function signup() {
    const emailRef = useRef(); 
    const passwordRef = useRef(); 
    const passwordConfirmRef = useRef(); 
    const { creatAcc } = useAuth(); 
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false); 

    async function handleSubmit(e) {
        e.preventDefault(); 

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match!'); 
        } 

        try { 
            setError(''); 
            setLoading(true); 
            await createAcc(emailRef.current.value, passwordRef.current.value); 
        } catch { 
            setError('Failed to create an Account'); 
        } 

        setLoading(false);

    }

    return (
        <>
            <Card> 
                <Card.body> 
                    <h2 className="text-center mb-4">Create Account</h2> 
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
                        <Form.Group id="password-confirm"> 
                            <Form.Label>Confirm Password</Form.Label> 
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group> 
                        <Button disable={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.body>
            </Card> 
            <div className="w-100 text-center mt-2"> 
                Already have an account? 
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