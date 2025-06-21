import { Request, Response } from "express";
import { prisma } from "../../db";
import { UserType } from "../../../prisma/generated/prisma";

interface UpdateUserBody {
    id: string;
    role: UserType;
}

const updateUser = async (req: Request, res: Response) => {
    const { id, role }: UpdateUserBody = req.body;

    const user = await prisma.user.update({
        where: { id: id },
        data: { role: role },
    });

    res.status(200).json({
        user: user,
        message: "User updated successfully",
    });
};

export { updateUser };