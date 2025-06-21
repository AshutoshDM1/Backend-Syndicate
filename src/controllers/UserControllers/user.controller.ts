import { Request, Response } from "express";
import { prisma } from "../../db";
import { UserType } from "../../../prisma/generated/prisma";

const userDetailTable = async (req: Request, res: Response) => {
    const { role } = req.query;

    const whereClause = role && role !== 'ALL' ? { role: role as UserType } : {};

    const users = await prisma.user.findMany({
        where: whereClause,
    }); 

    const totalUsers = await prisma.user.count({
        where: whereClause,
    });

    res.status(200).json({
        users: users,
        totalUsers: totalUsers,
        role: role,
        message: "User detail table fetched successfully",
    });
};

export { userDetailTable };


