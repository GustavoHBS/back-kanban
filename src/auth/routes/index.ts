import { Request, Response } from "express";
import { HttpMethod, HttpServer } from "../../setup/server/http-server";
import { container, inject } from "tsyringe";
import { Login } from "../services/login";
import { LoginRoutes } from "../controllers";
import "reflect-metadata";

export const route = (httpServer: HttpServer) => {
    console.log("AAAAAAAA")
    const ola = container.resolve(LoginRoutes)
    ola.registryRoutes(httpServer)
    console.log("AAAAAAAA")
}