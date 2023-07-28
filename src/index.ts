import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init(){
const app = express();
const Port = process.env.PORT|| 8000;
app.use(express.json())

    const gqlServer = new ApolloServer({
        typeDefs:` 
            type Query {
                hello:String

            }
        `,
        resolvers:{
            Query:{
                hello: ()=>"Hello Bhai Code chal gaya dekho "
            }
        },
    });

    await gqlServer.start()
    app.use('/graphql' , expressMiddleware(gqlServer))
    
    app.get('/',(req,res)=>{
        res.json({message:"Hello From Server"})
    })
    app.listen(Port,()=>{
        console.log(`server started successfully`)
    })
}
init();