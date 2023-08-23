/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { HomeModule } from "./home.module";
import { ProductsModule } from "./products.module";
import { CategoriesModule } from "./categories.module";
import { RouterModule, Routes } from "@nestjs/core";

const routes: Routes = [
    {
        path: '/',
        module: HomeModule
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
    imports: [RouterModule.register(routes), HomeModule, ProductsModule, CategoriesModule],
    exports: [],
})
export class RoutingModule {}
