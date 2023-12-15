import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(req){
    const body = await req.json();
    const { blog_id } = body;
    console.log("Blog id:", blog_id);
    try {
        const deleteBlog = await prisma.blog.delete({
            where: {
              b_id: blog_id,
            },
        });
        console.log("Deleted Blog: ", deleteBlog);
        return NextResponse.json(deleteBlog, {status:200});
    } catch (error) {
        return NextResponse.json({err: "Internal Server Erorr"}, {status: 500});
    }
}