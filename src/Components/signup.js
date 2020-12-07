const url = 'https://api.trumail.io/v2/lookups/JSON?email='; 
const email = 'nabyl0405@gmail.com'; 

const verifyEmail = async () => {
    const endpoint = `${url}${email}`; 

    try { 
        const response = await fetch (endpoint); 
    } catch (error) { 
        console.log(error); 
    }
}