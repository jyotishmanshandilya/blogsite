import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(){
    try{
        const allBlogs = await prisma.blog.findMany({
          where:{
            published: true,
          }
        })
        if(!allBlogs){
            console.log("No blogs currently");
            return NextResponse.json({error: "No blogs found"}, {status: 404});
        }
        // console.log(allBlogs);
        try {
            const authorPromises = allBlogs.map(async (blog) => {
                const author = await prisma.user.findUnique({
                  where: {
                    u_id: blog.authorId,
                  }
                });
                return {
                  ...blog,
                  authorName: author ? author.username : null,
                };
              });
              
              const blogsWithAuthor = await Promise.all(authorPromises);
              
              // Now, blogsWithAuthor is an array of blogs with an additional "authorName" field
              console.log(blogsWithAuthor);
              
            return NextResponse.json(blogsWithAuthor, {status: 200});
        } catch (error) {
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
    catch(err){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}