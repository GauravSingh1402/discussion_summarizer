import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github"




export default NextAuth({
    // Configure one or more authentication providers
    
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // ...add more providers here
    ],
    // Configure additional NextAuth settings here
    cookies: {
        // You can set any additional cookie options you need here
        sessionTokenPath: "/api/auth/session",
        sessionTokenSecure: true,
        sessionTokenMaxAge: 60 * 60 * 24 * 30, // 30 days
    },
            // const { email, provider } = user;
            // console.log(email,provider)
            // const queryParams = `?email=${email}&provider=${provider}`;
            // context.res.writeHead(302, { Location: `/login${queryParams}` });
            // context.res.end();
        
    
    
})
