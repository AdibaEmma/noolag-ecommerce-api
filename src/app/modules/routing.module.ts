/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { HomeModule } from "./home.module";
import { ProductsModule } from "./products.module";
import { CategoriesModule } from "./categories.module";
import { RouterModule, Routes } from "@nestjs/core";
import { AuthModule } from "@app/auth/auth.module";
import { UsersModule } from "./users.module";
import { OrdersModule } from "./orders.module";

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
    },
    {
        path: '/users',
        module: UsersModule
    },
    {
        path: '/orders',
        module: OrdersModule
    }
];

@Module({
    imports: [
        RouterModule.register(routes), 
        HomeModule, 
        ProductsModule, 
        CategoriesModule, 
        AuthModule, 
        UsersModule, 
        OrdersModule],
    exports: [],
})
export class RoutingModule {}
