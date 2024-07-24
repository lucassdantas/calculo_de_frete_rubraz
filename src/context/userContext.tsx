import { User } from "@/types/user";
import { createContext } from "react";

export const UserContext = createContext<User>({
    userId:0,
    userName:'Lucas',
    userEmail:'teste@teste.com',
    userPhone:'(21) 99999-9999',
    userCnpj:'000000',
    userDateOfCreation:new Date().toISOString(),
})