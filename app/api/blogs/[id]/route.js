import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, {params}){
    const blog_id = parseInt(params.id, 10);
    console.log("Blog id: ",blog_id);
    try {
        const blogData = await prisma.blog.findUnique({
            where:{
              b_id: blog_id,
            }
          })
        if(blogData){
            console.log(blogData);
            return NextResponse.json(blogData,{status:200});
        }
        return NextResponse.json({error: "Blog Not Found"},{status:404});
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"},{status:500});
    }
}

export async function PATCH(req, {params}){
    const blog_id = parseInt(params.id, 10);
    const body = await req.json();
    const { blogData } = body;
    // console.log("Blog id", blog_id);
    // console.log("Title", blogData.title);
    // console.log("Content", blogData.content);
    try {
        const editBlog = await prisma.blog.update({
            where: {
                b_id: blog_id,
            },
            data:{
                title: blogData.title,
                content: blogData.content,
                published: false,
            }
        });
        if(editBlog){
            console.log("Edited Blog ", editBlog);
            return NextResponse.json(editBlog, {status: 200});
        }
        return NextResponse.json({error: "Failed to edit blog"}, {status: 401});
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}