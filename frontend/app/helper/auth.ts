import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import axios from 'axios';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
export const authOptions = {
    pages : {
        signIn: '/signin',
        newUser: '/home'
    },
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: 'email', type: 'text', placeholder: 'email' },
            password: { label: 'password', type: 'password', placeholder: 'password' },
          },
          async authorize(credentials: any) {
          try {
              //console.log(credentials)

              const { username, password } = credentials;
            
              const response = await axios.post(`${backendUrl}/api/signin`,{email: username,password})
       
  
              if(response.status === 200){
                 return response.data.basics
              }
              else{
                return null
              }
            
          } catch (error) {
            //console.log(error)
            
          }
          },
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_ID ?? '',
          clientSecret: process.env.GOOGLE_SECRET ?? '',
          
        }),
        GitHubProvider({
          clientId: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
      ],
      
      secret: process.env.NEXTAUTH_SECRET,
   
}