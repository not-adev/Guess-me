import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export function get_id(token) {

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const id = decoded.id
        return id
    } catch (error) {
        throw new Error(error)
    }
}

