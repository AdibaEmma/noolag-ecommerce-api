/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { HomeModule } from "./home.module";
import { ProductsModule } from "./products.module";
import { CategoriesModule } from "./categories.module";
import { RouterModule, Routes } from "@nestjs/core";
import { AuthModule } from "@app/auth/auth.module";

const routes: Routes = [
    {
        path: '/',
        module: HomeModule
    },
    {
        path: '/auth',
        module: AuthModule
    },
    {
        path: '/products',
        module: ProductsModule
    },
    {
        path: '/categories',
        module: CategoriesModule
    }
];

@Module({
    imports: [RouterModule.register(routes), HomeModule, ProductsModule, CategoriesModule, AuthModule],
    exports: [],
})
export class RoutingModule {}
