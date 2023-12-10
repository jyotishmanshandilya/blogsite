import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { setCookie } from "@/action";
const prisma = new PrismaClient();

export async function POST(req, res){
    try{
        const body = await req.json();
        const { username, password, email } = body;
        try{
            const user = await prisma.user.findUnique({
                where: {
                    username: username,
                    email: email,
                    password: password,
                },
            });
            if(!user){
                console.log('failed login');
                return NextResponse.json({ error: 'Login Failed' }, { status: 401 });
            }
            console.log('successful login');
            setCookie();
            return NextResponse.json({ msg: 'Login Successful' }, { status: 200 });
        }
        catch(err){
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
    catch(err){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}