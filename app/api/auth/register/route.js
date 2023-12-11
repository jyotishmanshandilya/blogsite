import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req, res){
    try{
        const body = await req.json();
        const { username, email, password } = body;
        try{
            const userExists = await prisma.user.findUnique({
                where: {
                    username: username,
                    password: password,
                },
            });
            if(userExists){
                console.log('failed register');
                return NextResponse.json({ error: 'User already exists' }, { status: 401 });
            }

            const newUser = await prisma.user.create({
                data: {
                  username: username,
                  email: email,
                  password: password,
                },
              })
            console.log('Successful registration');
            return NextResponse.json({ msg: 'Registration successful' }, { status: 200 });
        }
        catch(err){
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    }
    catch(err){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}